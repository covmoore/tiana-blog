'use client'
import React from "react"

export default function EmptyPosts() {
  return (
    <div className="flex items-center flex-col">
      <p className="text-lg font-medium">
        There are currently no posts. CREATE SOME TIANA!!!!
      </p>
      <div className="flex mt-3">
        <a
          key="Create Post"
          href="/create"
          className={'bg-postBorderColor text-white  hover:bg-buttonSelectedColor rounded-md px-3 py-2 text-lg font-medium'}
        >
          Create Post
        </a>
      </div>
    </div>
  )
}