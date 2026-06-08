'use client'

import BlogPost from "../../components/BlogPost"
import { fetchBlogs } from "../../apis/blogs"

export default function Post({ params }) {
  const slug = params.slug
  const {data, loading, error} = fetchBlogs()
  let blog = null;
  if (data) {
    blog = data.find(({ key }) => key == slug)
  }

  return (
    <div>
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>error</p>}
    {data && blog && <BlogPost key={blog.bid} {...{ blog }} />}
    {data && !blog && <p>Post not found.</p>}
    </div>
    )
}