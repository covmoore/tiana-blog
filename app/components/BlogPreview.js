export default function BlogPreview(props) {
  const blog = props.blog
  const route = `/posts/${blog.key}`
  return (
    <a href={route}>
      <div className="border-solid border-2 border-purple-300 border-spacing-28 mb-32">
        <div className="my-8 mx-8">
          <div className="flex flex-row justify-between my-6 items-center">
            <text className="font-medium">Date: {blog.date}</text>
            <div className="flex justify-center my-6">
              <text className="text-4xl font-medium underline">{blog.title}</text>
            </div>
            <text className="font-medium">Author: {blog.author}</text>
          </div>
        </div>
      </div>
    </a>
  )
}