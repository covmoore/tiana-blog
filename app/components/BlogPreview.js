export default function BlogPreview(props) {
  const blog = props.blog
  const route = `/posts/${blog.key}`
  return (
    <a href={route}>
      <div className="hover:bg-secondary hover:bg-opacity-30 border-solid border-accent border-2 bg-primary border-spacing-28 mb-32 rounded-md shadow-lg">
        <div className="my-8 mx-8">
          <div className="flex flex-row justify-between my-6 items-center">
            <text className="font-normal black">Date: {blog.date}</text>
            <div className="flex justify-center my-6">
              <text className="text-4xl font-medium underline mx-8">{blog.title}</text>
            </div>
            <text className="font-normal">Author: {blog.author}</text>
          </div>
        </div>
      </div>
    </a>
  )
}