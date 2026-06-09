'use client'

import Intro from "./components/IntroSection"
import IntroImage from "./components/IntroImage"
import BlogPreview from "./components/BlogPreview"
import EmptyPosts from "./components/EmptyPosts"
import { fetchBlogs } from "./apis/blogs"

export default function Page() {
  const { data, loading, error } = fetchBlogs()
  const blogs = data ?? []

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
            <div className="p-4 bg-gray-100 overflow-y-scroll max-h-[700px]">
              <div className="max-w-screen-xl min-h-screen-m">
                {blogs.filter((_, i) => i < 5).map((blog) => (
                  <BlogPreview key={blog.bid} {...{ blog }} />
                ))}
              </div>
            </div>
          }
          {blogs.length === 0 && <EmptyPosts />}
        </div>
      </div>
    </div>
  )
}
