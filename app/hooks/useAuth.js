'use client'

import { useState, useEffect, useCallback } from 'react'

const PREVIEW_MODE_KEY = 'previewMode'
const PREVIEW_MODE_EVENT = 'previewModeChange'

function isTokenValid(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAdmin(!!token && isTokenValid(token))
    setPreviewMode(sessionStorage.getItem(PREVIEW_MODE_KEY) === 'true')
    setLoading(false)

    const handlePreviewModeChange = () => {
      setPreviewMode(sessionStorage.getItem(PREVIEW_MODE_KEY) === 'true')
    }
    window.addEventListener(PREVIEW_MODE_EVENT, handlePreviewModeChange)
    return () => window.removeEventListener(PREVIEW_MODE_EVENT, handlePreviewModeChange)
  }, [])

  const enterPreviewMode = useCallback(() => {
    sessionStorage.setItem(PREVIEW_MODE_KEY, 'true')
    setPreviewMode(true)
    window.dispatchEvent(new Event(PREVIEW_MODE_EVENT))
  }, [])

  const exitPreviewMode = useCallback(() => {
    sessionStorage.removeItem(PREVIEW_MODE_KEY)
    setPreviewMode(false)
    window.dispatchEvent(new Event(PREVIEW_MODE_EVENT))
  }, [])

  return {
    isAuthenticated: isAdmin && !previewMode,
    isAdmin,
    previewMode,
    enterPreviewMode,
    exitPreviewMode,
    loading,
  }
}
