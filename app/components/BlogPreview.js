import { getCatColor, classNames } from "../utils"
import { getImageUrl } from "../apis/images"
import { useAuth } from "../hooks/useAuth"
import fallbackCoverImage from "../../public/dawg.png"

export default function BlogPreview(props) {
  const blog = props.blog
  const { isAuthenticated } = useAuth()
  const isDraft = blog.status === 'draft'
  const route = isDraft ? `/create?postId=${blog.bid}` : `/posts/${blog.key}`
  const dateCreated = blog.dateCreated ? new Date(blog.dateCreated) : null
  const coverImageSrc = blog.coverImage ? getImageUrl(blog.coverImage) : fallbackCoverImage.src
  return (
    <a href={route}>
      <div className={classNames(
        isDraft ? "bg-draftGray/90 hover:bg-draftGray" : "bg-blogPreviewOrange/70 hover:bg-blogPreviewOrange",
        `group relative overflow-hidden hover:shadow-3xl transition-all ease-in duration-300 border-solid border-${getCatColor(blog.categoryId)} border-2 border-spacing-28 mb-12 rounded-md shadow-lg w-[45vw] mx-auto`
      )}>
        <div
          className={classNames("absolute inset-0 -z-10 bg-cover bg-center", isDraft ? "opacity-30" : "opacity-80")}
          style={{ backgroundImage: `url(${coverImageSrc})` }}
        />
        <div className=" mx-4 py-[30px] flex justify-center flex-col content-center flex-wrap items-center w-[-webkit-fill-available]">
          <div className="flex flex-row my-6 justify-between w-[-webkit-fill-available]">
            <text className="font-normal black">Date: {dateCreated ? dateCreated.toDateString() : '-'}</text>
            <div>
              {isAuthenticated && (
                <text className="mr-2 font-medium uppercase">{blog.status}</text>
              )}
              <text className={classNames(`bg-${getCatColor(blog.categoryId)}`, "drop-shadow-md px-1 font-medium rounded-md box-border max-h-fit")}>
                {blog.categoryName}
              </text>
              <text className="ml-2 font-normal">Author: {blog.author}</text>
            </div>
          </div>
          <div className="relative w-full h-0 group-hover:h-[350px] overflow-hidden transition-all ease-in duration-300">
            <div
              className={classNames(
                "absolute inset-0 -z-10 group-hover:z-10 bg-cover bg-center transition-opacity ease-in duration-300",
                isDraft ? "opacity-30 group-hover:opacity-60" : "opacity-80 group-hover:opacity-100"
              )}
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
