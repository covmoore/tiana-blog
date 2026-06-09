'use client'

import { useRef, useState } from 'react'
import { fetchHomeImages, uploadImage } from '../apis/images'
import { useAuth } from '../hooks/useAuth'
import aboutMeFallback from '../../public/dawg.png'

export default function IntroImage() {
  const { data: homeImages } = fetchHomeImages()
  const { isAuthenticated } = useAuth()
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null)
  const [pendingFile, setPendingFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const homeImageSrc = uploadedImageSrc ?? homeImages?.[0]?.url ?? aboutMeFallback.src

  const textClass = "font-[Caveat] text-8xl font-bold text-rose text-center"

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setPendingFile(file)
    setUploadedImageSrc(URL.createObjectURL(file))
  }

  function handleCancel() {
    setPendingFile(null)
    setUploadedImageSrc(null)
    fileInputRef.current.value = ''
  }

  async function handleSave() {
    if (!pendingFile) return
    setUploading(true)
    try {
      await uploadImage('home', pendingFile)
      setPendingFile(null)
    } catch (err) {
      console.error('Upload failed', err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative">
      <a
        href="/about-me"
        onMouseEnter={e => document.getElementById('about-me-text').setAttribute('class', textClass + ' animate-fadeIn')}
        onMouseLeave={e => document.getElementById('about-me-text').setAttribute('class', textClass + ' animate-fadeOut opacity-0')}
      >
        <div className="relative text-center">
          <img src={homeImageSrc} className="h-full min-w-[55vw] object-cover mt-5" />
          <div className="w-full absolute top-0 left-0 text-center mt-[35%]">
            <h1
              id="about-me-text"
              className={textClass + ' opacity-0'}
              style={{ textShadow: '-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white' }}
            >
              About Me
            </h1>
          </div>
        </div>
      </a>
      {isAuthenticated && (
        <>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          {pendingFile ? (
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                onClick={handleCancel}
                disabled={uploading}
                className="bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded shadow hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={uploading}
                className="bg-postBorderColor text-white text-sm font-medium px-3 py-1 rounded shadow hover:bg-buttonHoverColor disabled:opacity-50"
              >
                {uploading ? 'Saving...' : 'Save'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded shadow hover:bg-gray-100"
            >
              Edit Photo
            </button>
          )}
        </>
      )}
    </div>
  )
}
