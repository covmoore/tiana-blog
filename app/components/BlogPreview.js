import { getCatColor, classNames } from "../utils"

export default function BlogPreview(props) {
  const blog = props.blog
  const route = `/posts/${blog.key}`
  const dateCreated = new Date(blog.dateCreated)
  return (
    <a href={route}>
      <div className={`hover:bg-opacity-30 border-solid border-${getCatColor(blog.categoryName)} border-2 bg-postForegroundColor border-spacing-28 mb-12 rounded-md shadow-lg`}>
        <div className=" mx-4  flex justify-center flex-col content-center flex-wrap items-center w-[-webkit-fill-available]">
          <div className="flex flex-row  justify-center w-[-webkit-fill-available]">
            <div className="flex flex-row  my-6 justify-between w-[-webkit-fill-available]">
              <text className="font-normal black">Date: {dateCreated.toDateString()}</text>
              <div className="flex justify-center mt-6">
                <text className="text-4xl font-medium mt-8">{blog.title}</text>
              </div>
              <div>
                <text className={classNames(`bg-${getCatColor(blog.categoryName)}`, "drop-shadow-md px-1 font-medium rounded-md box-border max-h-fit")}>
                  {blog.categoryName}
                </text>
                <text className="ml-2 font-normal">Author: {blog.author}</text>
              </div>
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
