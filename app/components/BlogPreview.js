export default function BlogPreview(props) {
  const blog = props.blog
  const route = `/posts/${blog.key}`
  return (
    <a href={route}>
      <div className="hover:bg-postBorderColor hover:bg-opacity-30 border-solid border-postBorderColor border-2 bg-postForegroundColor border-spacing-28 mb-12 rounded-md shadow-lg">
        <div className=" mx-4  flex justify-center flex-col content-center flex-wrap items-center w-[-webkit-fill-available]">
          <div className="flex flex-row  justify-center w-[-webkit-fill-available]">
            <div className="flex flex-row  my-6 justify-between w-[-webkit-fill-available]">
              <text className="font-normal black">Date: {blog.dateCreated}</text>
              <div className="flex justify-center mt-6">
                <text className="text-4xl font-medium mt-8">{blog.title}</text>
              </div>
              <text className="font-normal">Author: {blog.author}</text>
            </div>
          </div>
          {blog.image && (
            <img className="h-full w-[-webkit-fill-available] object-cover max-h-[600px]" src={blog.image} />
          )}
        </div>
      </div>
    </a>
  )
}