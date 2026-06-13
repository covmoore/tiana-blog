'use client'

import { useState, useRef, useEffect } from 'react'
import { fetchIntro, updateIntro } from '../apis/intro'
import { useAuth } from '../hooks/useAuth'

export default function Intro() {
  const { data, loading, error } = fetchIntro()
  const { isAuthenticated } = useAuth()
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [editing])

  function handleBodyChange(e) {
    setBody(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  function handleEdit() {
    setTitle(data.title)
    setBody(data.body)
    setEditing(true)
  }

  function handleCancel() {
    setEditing(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      await updateIntro(title, body)
      data.title = title
      data.body = body
      setEditing(false)
    } catch (err) {
      console.error('Failed to save intro', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="px-4 py-4">Loading...</div>
  if (error || !data) return null

  return (
    <div className="relative">
      {editing ? (
        <div className="flex flex-col gap-3 px-4 py-4">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-4xl text-center border-none outline-none px-2 py-1"
            style={{ backgroundColor: 'transparent', width: `${Math.max(4, title.length)}ch` }}
          />
          <textarea
            ref={textareaRef}
            value={body}
            onChange={handleBodyChange}
            rows={1}
            className="text-xl border-none outline-none px-2 py-1 w-full resize-none overflow-hidden"
            style={{ backgroundColor: 'transparent' }}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded shadow hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-postBorderColor text-white text-sm font-medium px-3 py-1 rounded shadow hover:bg-buttonHoverColor disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row text-3xl sm:text-4xl justify-center max-sm:text-center max-sm:px-4">{data.title}</div>
          <div className="flex flex-row text-lg sm:text-xl justify-center px-4 py-4 max-sm:text-center">{data.body}</div>
          {isAuthenticated && (
            <div className="flex justify-end px-4">
              <button
                onClick={handleEdit}
                className="bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded shadow hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
