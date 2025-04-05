'use client'

import { blogs } from "./mockData/mockBlogs"
import Intro from "./components/IntroSection"
import BlogPreview from "./components/BlogPreview"

export default function Page() {
  return (
    <div className="flex flex-col items-center mx-auto px-4 py-8">
      <Intro key="intro" />
      {/*BLOG POSTS */}
      <div className=" max-w-screen-xl  mx-6 my-32 min-h-screen-m">
        {blogs.filter((val, i) => i < 5).map((blog) => (
          <BlogPreview key={blog.bid} {...{ blog }} />
        ))}
      </div>
      {/*BLOG POSTS*/}
    </div>
  )
}