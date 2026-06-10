import { getCatColor, classNames } from "../utils"
import { getImageUrl } from "../apis/images"
import fallbackCoverImage from "../../public/dawg.png"

export default function BlogPreview(props) {
  const blog = props.blog
  const route = `/posts/${blog.key}`
  const dateCreated = new Date(blog.dateCreated)
  const coverImageSrc = blog.coverImage ? getImageUrl(blog.coverImage) : fallbackCoverImage.src
  return (
    <a href={route}>
      <div className={`group relative overflow-hidden bg-blogPreviewOrange/70 hover:bg-blogPreviewOrange hover:shadow-3xl transition-all ease-in duration-300 border-solid border-${getCatColor(blog.categoryId)} border-2 border-spacing-28 mb-12 rounded-md shadow-lg w-[45vw] mx-auto`}>
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${coverImageSrc})` }}
        />
        <div className=" mx-4 py-[30px] flex justify-center flex-col content-center flex-wrap items-center w-[-webkit-fill-available]">
          <div className="flex flex-row my-6 justify-between w-[-webkit-fill-available]">
            <text className="font-normal black">Date: {dateCreated.toDateString()}</text>
            <div>
              <text className={classNames(`bg-${getCatColor(blog.categoryId)}`, "drop-shadow-md px-1 font-medium rounded-md box-border max-h-fit")}>
                {blog.categoryName}
              </text>
              <text className="ml-2 font-normal">Author: {blog.author}</text>
            </div>
          </div>
          <div className="relative w-full h-0 group-hover:h-[350px] overflow-hidden transition-all ease-in duration-300">
            <div
              className="absolute inset-0 -z-10 group-hover:z-10 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity ease-in duration-300"
              style={{ backgroundImage: `url(${coverImageSrc})` }}
            />
          </div>
          <div className="flex justify-center mt-6">
            <text className="text-4xl font-medium mt-8">{blog.title}</text>
          </div>
        </div>
      </div>
    </a>
  )
}
