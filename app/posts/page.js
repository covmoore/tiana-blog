'use client'

import { usePathname } from 'next/navigation'
import { fetchBlogs } from '../apis/blogs'

export default function PostsPage({ params }) {
  const path = usePathname()
  const {data, loading, error} = fetchBlogs()
  let blogs = [];
    if (data) { 
      blogs = data;
    }

  return (
    <div className="flex flex-col mx-8 my-4">
      <div className="flex justify-center text-5xl mb-12">
        Posts
      </div>
      <div className="flex flex-row flex-wrap justify-center ">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>error</p>}
      {data && blogs.map((blog) => (
          <a href={`${path}/${blog.key}`}>
            <div className="flex flex-col mx-2 my-2 border-2 h-150 w-150 rounded-xl shadow-lg bg-primary border-accent hover:bg-secondary hover:bg-opacity-30">
              <div className="mx-3 my-5">
                <div className="flex flex-row justify-between mb-24">
                  <text className="mr-6">{blog.date}</text>
                  <text className="ml-6">{blog.author}</text>
                </div>
                <div className="flex justify-center flex-wrap">
                  <text className="text-xl">{blog.title}</text>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}