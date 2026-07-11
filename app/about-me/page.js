'use client'

import { useState, useRef, useEffect } from 'react'
import { fetchAboutMeImages } from '../apis/images'
import { fetchAboutMe, updateAboutMe } from '../apis/aboutMe'
import { useAuth } from '../hooks/useAuth'
import Markdown, { defaultUrlTransform } from "react-markdown"

export default function AboutMe() {
  const { data: images, loading: imagesLoading, error: imagesError } = fetchAboutMeImages()
  const { data, loading, error } = fetchAboutMe()
  const { isAuthenticated } = useAuth()
  const [editing, setEditing] = useState(false)
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
    setBody(data.body)
    setEditing(true)
  }

  function handleCancel() {
    setEditing(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      await updateAboutMe(body)
      data.body = body
      setEditing(false)
    } catch (err) {
      console.error('Failed to save about me', err)
    } finally {
      setSaving(false)
    }
  }

  function urlTransform(url) {
    return url.startsWith('blob:') ? url : defaultUrlTransform(url)
  }

  const markdownComponents = {
    a: ({ node, ...props }) => (
      <a {...props} className="text-linkBlue underline" />
    ),
  }

  function resolveImageRefs(body) {
    if (!body) return body
    return body.replace(/image:\/\/([^)\s]+)/g, (_, ref) => getImageUrl(decodeURIComponent(ref)))
  }

  return (
    <div className="flex flex-col mx-3">
      <div className="flex justify-center">
        <text className="text-4xl sm:text-5xl"> About Me</text>
      </div>
      <div className="mx-2 sm:mx-60">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {data && (editing ? (
          <div className="flex flex-col gap-3 my-7">
            <textarea
              ref={textareaRef}
              value={body}
              onChange={handleBodyChange}
              rows={1}
              className="text-base border-none outline-none px-2 py-1 w-full resize-none overflow-hidden"
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
          <>
            {data.body.split('\n\n').map((paragraph, i) => (
              <div key={i} className="my-7">
                <Markdown urlTransform={urlTransform} components={markdownComponents}>{resolveImageRefs(paragraph)}</Markdown>
              </div>
            ))}
            {isAuthenticated && (
              <div className="flex justify-end">
                <button
                  onClick={handleEdit}
                  className="bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded shadow hover:bg-gray-100"
                >
                  Edit
                </button>
              </div>
            )}
          </>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mx-2 sm:mx-60 my-7">
        {imagesLoading && <p>Loading images...</p>}
        {imagesError && <p style={{ color: 'red' }}>{imagesError}</p>}
        {images && images.map((img) => (
          <img key={img.id} src={img.url} alt={img.objectName} className="max-h-[400px] max-w-full object-cover" />
        ))}
      </div>
    </div>
  )
}
