import Markdown from "react-markdown"
import { classNames, getCatColor } from "../utils"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { deletePost } from "../apis/blogs"
import { useAuth } from "../hooks/useAuth"
import { getImageUrl } from "../apis/images"
import fallbackCoverImage from "../../public/dawg.png"


export default function BlogPost(props) {
  console.log("PROPS INTO BLOG POSt", props)
  const blog = props.blog
  const dateCreated = new Date(blog.dateCreated)
  const coverImageSrc = blog.coverImage ? getImageUrl(blog.coverImage) : fallbackCoverImage.src
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [showModal, getShowModal] = useState(false);
  function handleDeleteConfirmation() {
    getShowModal(true)
  }
  function closeModal() {
    getShowModal(false)
  }
  async function handleDelete() {
    await deletePost(blog.bid)
    getShowModal(false)
    router.push('/posts')
  }
  return (
    <div className="border-solid  mb-32 pt-1 bg-white rounded-lg">
      <img className="w-full max-h-[500px] object-cover rounded-t-lg" src={coverImageSrc} />
      <div className="mx-1">
        <div className="my-2 mx-5">
          <div className="flex flex-row justify-between my-6">
            <text className="font-medium">Author: {blog.author}</text>
            <div className=" flex flex-row-reverse">
              <text className="pl-1 font-medium">Date: {dateCreated.toDateString()}</text>
              {blog.categoryName &&
                <text className={classNames(`bg-${getCatColor(blog.categoryId)}`, "drop-shadow-md px-1 font-medium rounded-md box-border max-w-fit max-h-fit")}>
                  {blog.categoryName}
                </text>}
            </div>
            {isAuthenticated && <button className={
              'text-gray-700 hover:bg-buttonHoverColor hover:text-white rounded-md px-3 py-2 text-lg font-medium'
            } id="open-btn" onClick={handleDeleteConfirmation}>Delete Post</button>}
          </div>
          {showModal &&
            <div id="modal" class="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
              <div class="bg-white p-6 rounded-md shadow-lg">
                <h3 class="font-medium text-lg">Are you sure you want to delete this post?</h3>
                <p class="text-sm text-gray-500 font-bold justify-center">This cannot be undone.</p>
                <button id="close-btn" onClick={handleDelete} class="mt-4 bg-purple-500 text-black px-4 py-2 rounded">Confirm Delete</button>
                <button id="close-btn" onClick={closeModal} class="mt-4 bg-purple-500 text-black px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          }
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
