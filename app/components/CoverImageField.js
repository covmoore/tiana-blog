'use client'

import { useRef } from 'react'

export default function CoverImageField({ file, onChange }) {
  const fileInputRef = useRef(null)

  function handleFileChange(e) {
    const selected = e.target.files?.[0]
    if (selected) onChange(selected)
  }

  return (
    <div className="px-4 py-2 bg-neutral-secondary-medium">
      <label className="px-2">Cover Image</label>
      <div className="flex items-center gap-3 px-2 mt-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-black rounded-md bg-postForegroundColor hover:bg-buttonHoverColor shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none"
        >
          Choose image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {file && (
          <>
            <img src={URL.createObjectURL(file)} alt="Cover preview" className="h-12 w-12 object-cover rounded-md" />
            <span className="text-sm text-body">{file.name}</span>
          </>
        )}
      </div>
    </div>
  )
}
