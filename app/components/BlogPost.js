export default function BlogPost(props) {
  console.log(props)
  const blog = props.blog
  return (
    <div className="border-solid  mb-32">
      <div className="my-2">
        <div className="flex flex-row justify-between my-6">
          <text className="font-medium">Author: {blog.author}</text>
          <text className="font-medium">Date: {blog.date}</text>
        </div>
        <div className="flex justify-center my-6">
          <text className="text-4xl font-medium underline">{blog.title}</text>
        </div>
        <div className="my-6">
          {blog.body.map((val) => (
            <div className="mb-4">
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}