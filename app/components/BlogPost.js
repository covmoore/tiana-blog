import Markdown from "react-markdown"
import { classNames, getCatColor } from "../utils"


export default function BlogPost(props) {
  console.log("PROPS INTO BLOG POSt", props)
  const blog = props.blog
  return (
    <div className="border-solid  mb-32 pt-1 bg-white rounded-lg">
      <div className="mx-1">
        <div className="my-2 mx-5">
          <div className="flex flex-row justify-between my-6">
            <text className="font-medium">Author: {blog.author}</text>
            <div className=" flex flex-row-reverse">
              <text className="pl-1 font-medium">Date: {blog.dateCreated}</text>
              {blog.categoryName &&
                <text className={classNames(`bg-${getCatColor(blog.categoryName)}`, "drop-shadow-md px-1 font-medium rounded-md box-border max-w-fit max-h-fit")}>
                  {blog.categoryName}
                </text>}
            </div>
          </div>
          <div className="flex justify-center my-6">
            <text className="text-4xl font-medium underline">{blog.title}</text>
          </div>
          <div className="my-6">
            <div className="prose lg:prose-xl prose-code:before:hidden prose-code:after:hidden ">
              <Markdown>{blog.body}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}