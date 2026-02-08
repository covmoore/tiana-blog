'use client'

import Intro from "./components/IntroSection"
import BlogPreview from "./components/BlogPreview"
import { fetchBlogs } from "./apis/blogs"
import dawg from '../public/dawg.png'
import Image from 'next/image';

export default function Page() {
  const { data, loading, error } = fetchBlogs()
  let blogs = []
  if (data) {
    blogs = data;
  }
  return (
    <div className="flex flex-col items-center mx-auto px-4 py-8">
      <Intro key="intro" />
      <div className="flex col">
        <div>
          <Image src={dawg} className="h-full w-[-webkit-fill-available] object-cover max-h-[600px]"/>
        </div>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>error</p>}
          {/*BLOG POSTS */}
          {data && <div className=" max-w-screen-xl  mx-6 my-32 min-h-screen-m">
            {blogs.filter((val, i) => i < 5).map((blog) => (
              <BlogPreview key={blog.bid} {...{ blog }} />
            ))}
          </div>}
          {/*BLOG POSTS*/}
        </div>
      </div>
    </div>
  )
}