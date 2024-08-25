'use client'

import { blogs } from "./mockData/mockBlogs"
import Intro from "./components/IntroSection"
import BlogPreview from "./components/BlogPreview"

export default function Page() {
  return (
    <div className="mx-auto bg-red-100 px-4 py-8">
      <Intro />
      {/*BLOG POSTS */}
      <div className="max-w-screen-xl  mx-6 my-32">
        {blogs.filter((val, i) => i < 5).map((blog) => (
          <BlogPreview {...{ blog }} />
        ))}
      </div>
      {/*BLOG POSTS*/}
    </div>
  )
}