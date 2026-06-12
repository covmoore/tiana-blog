'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import BlogPost from "../../components/BlogPost"
import { fetchBlogs } from "../../apis/blogs"
import { useAuth } from "../../hooks/useAuth"

export default function Post({ params }) {
  const slug = params.slug
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const {data, loading, error} = fetchBlogs(isAuthenticated)
  let blog = null;
  if (data) {
    blog = data.find(({ key }) => key == slug)
  }

  useEffect(() => {
    if (blog?.status === 'draft') {
      router.replace(`/create?postId=${blog.bid}`)
    }
  }, [blog, router])

  if (blog?.status === 'draft') return null

  return (
    <div>
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>error</p>}
    {data && blog && <BlogPost key={blog.bid} {...{ blog }} />}
    {data && !blog && <p>Post not found.</p>}
    </div>
    )
}