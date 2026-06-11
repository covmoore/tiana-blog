'use client'

import { useState } from "react"
import Intro from "./components/IntroSection"
import IntroImage from "./components/IntroImage"
import BlogPreview from "./components/BlogPreview"
import EmptyPosts from "./components/EmptyPosts"
import { fetchBlogs } from "./apis/blogs"
import { useAuth } from "./hooks/useAuth"

const BLOGS_PER_PAGE = 5

export default function Page() {
  const { isAuthenticated } = useAuth()
  const { data, loading, error } = fetchBlogs(isAuthenticated)
  const blogs = data ?? []
  const [visibleCount, setVisibleCount] = useState(BLOGS_PER_PAGE)

  return (
    <div className="flex flex-col items-center mx-auto">
      <Intro key="intro" />
      <div className="flex col gap-16">
        <IntroImage />
      </div>
      <div>
        <div className="sticky top-0 pb-2 mx-6 my-10">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>error</p>}
          {blogs.length > 0 &&
            <div className="p-4 bg-gray-100">
              <div className="max-w-screen-xl min-h-screen-m">
                {blogs.slice(0, visibleCount).map((blog) => (
                  <BlogPreview key={blog.bid} {...{ blog }} />
                ))}
              </div>
              {visibleCount < blogs.length &&
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + BLOGS_PER_PAGE)}
                    className="text-black rounded-md bg-brand box-border bg-postForegroundColor hover:bg-buttonHoverColor hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                  >
                    Show more
                  </button>
                </div>
              }
            </div>
          }
          {blogs.length === 0 && <EmptyPosts />}
        </div>
      </div>
    </div>
  )
}
