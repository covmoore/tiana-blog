'use client'

import Intro from "./components/IntroSection"
import BlogPreview from "./components/BlogPreview"
import { fetchBlogs } from "./apis/blogs"
import dawg from '../public/dawg.png'
import aboutMe from '../public/tiana-about-me.jpeg'
import Image from 'next/image';

export default function Page() {
  const { data, loading, error } = fetchBlogs()
  let blogs = []
  if (data) {
    blogs = data;
  }
  let textInAboutClass = "text-5xl font-bold text-red-500 text-center"
  const handleTextFadeIn = () => {
    document.getElementById("about-me-text").setAttribute("class", (textInAboutClass + " animate-fadeIn"))
  }
  const handleTextFadeOut = () => {
    document.getElementById("about-me-text").setAttribute("class", (textInAboutClass + " animate-fadeOut opacity-0"))
  }
  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="flex col">
        <div>
          <a href="/about-me" onMouseEnter={handleTextFadeIn} onMouseOut={handleTextFadeOut}>
            <div className="relative text-center">
              <Image src={aboutMe} className="h-full w-[-webkit-fill-available] object-cover max-h-[650px] mt-20" />
              <div className="w-full absolute top-0 left-0 text-center mt-[50%]">
                <h1 id="about-me-text" className={textInAboutClass + " opacity-0"}>
                  About Me
                </h1>
              </div>
            </div>
          </a>

        </div>
        <div>
          <Intro key="intro" />
          <div className="p-4 bg-gray-100 overflow-y-scroll max-h-[700px]">
            <div className="sticky top-0 pb-2">
              {loading && <p>Loading...</p>}
              {error && <p style={{ color: 'red' }}>error</p>}
              {/*BLOG POSTS */}
              {data && <div className="max-w-screen-xl  mx-6 my-10 min-h-screen-m">
                {blogs.filter((val, i) => i < 5).map((blog) => (
                  <BlogPreview key={blog.bid} {...{ blog }} />
                ))}
              </div>}
              {/*BLOG POSTS*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}