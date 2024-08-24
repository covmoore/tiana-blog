'use client'

import books from "./media/books.jpg"
import { blogs, intro } from "./mockData/mockBlogs"

export default function Page() {
  return (
    <div className="mx-auto bg-red-100 px-4 py-8">
      {/* TITLE */}
      <div className="flex flex-row text-5xl justify-center">{intro.title}</div>
      <div>{intro.picture}</div>
      <div className="flex flex-row text-2xl justify-center px-4 py-8">{intro.body}</div>
      {/* TITLE */}
      {/*BLOG POSTS */}
      <div className="max-w-screen-lg  mx-6 my-32">
        {blogs.map((blog) => (
          <div className="border-solid border-2 border-y-purple-300 border-x-transparent border-spacing-28 mb-32">
            <div className="my-8">
              <div className="flex flex-row justify-between my-6">
                <text className="font-medium">Author: {blog.author}</text>
                <text className="font-medium">Date: {blog.date}</text>
              </div>
              <div className="flex justify-center my-6">
                <text className="text-4xl font-medium underline">{blog.title}</text>
              </div>
              <div className="my-6">
                {blog.body.map((val) => (
                  <div className="mb-4">
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*BLOG POSTS*/}
    </div>
  )
}