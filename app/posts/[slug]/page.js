import { blogs } from "../../mockData/mockBlogs"
import BlogPost from "../../components/BlogPost"

export default function Post({ params }) {
  const slug = params.slug

  const blog = blogs.find(({ key }) => key == slug)
  console.log("HERE", blog)
  return (
    <div>
      <BlogPost key={blog.bid} {...{ blog }} />
    </div>
  )
}