const DRAFT_CACHE_KEY = 'inProgressPost'

export function saveDraftCache(draft) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(DRAFT_CACHE_KEY, JSON.stringify({ ...draft, savedAt: Date.now() }))
}

export function loadDraftCache() {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem(DRAFT_CACHE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearDraftCache() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(DRAFT_CACHE_KEY)
}

export function hasInProgressDraft() {
  const cache = loadDraftCache()
  return !!cache && !!((cache.title && cache.title.trim()) || (cache.content && cache.content.trim()))
}
