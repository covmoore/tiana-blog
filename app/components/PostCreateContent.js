import CreateEditContent from "./CreateEditContent";
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { classNames } from "../utils";
import BlogPost from "./BlogPost";
import { fetchBlogs, fetchConfig } from "../apis/blogs";

const viewSelection = [
  { name: "Edit", current: true },
  { name: "Preview", current: false }
]

export default function PostCreateContent() {
  const searchParams = useSearchParams()
  const draftId = searchParams.get('postId')

  const [isPreviewContext, setPreviewContext] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [existingCoverImage, setExistingCoverImage] = useState(null);
  const [inlineImages, setInlineImages] = useState([]);
  const [postId, setPostId] = useState(draftId ? Number(draftId) : null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [hydratedPost, setHydratedPost] = useState(null);

  const { data: posts } = fetchBlogs(true)
  const { data: categoriesData } = fetchConfig("category")

  const inlineImagesRef = useRef(inlineImages)
  inlineImagesRef.current = inlineImages
  useEffect(() => {
    return () => inlineImagesRef.current.forEach((img) => URL.revokeObjectURL(img.url))
  }, [])

  // Populate the form with the draft's saved progress once it has loaded
  useEffect(() => {
    if (!draftId || !posts || hydratedPost) return
    const post = posts.find((p) => p.bid === Number(draftId))
    if (!post) return
    setTitle(post.title)
    setContent(post.body)
    setExistingCoverImage(post.coverImage)
    setHydratedPost(post)
  }, [draftId, posts, hydratedPost])

  // Resolve the draft's category once the category config has loaded
  useEffect(() => {
    if (!hydratedPost || !categoriesData || category) return
    const cat = categoriesData.find((c) => c.categoryId === hydratedPost.categoryId)
    if (cat) setCategory(cat)
  }, [hydratedPost, categoriesData, category])

  useEffect(() => {
    if (!draftSaved) return
    const timeout = setTimeout(() => setDraftSaved(false), 3000)
    return () => clearTimeout(timeout)
  }, [draftSaved])

  const previewBody = inlineImages.reduce(
    (body, img) => body.replaceAll(`inline://${img.id}`, img.url),
    content
  )

  const handlePressed = (e) => {
    const name = e.target.getAttribute('name');

    for (let view of viewSelection) {
      if (view.name === name) {
        view.current = true
        if (view.name == "Preview") {
          setPreviewContext(true)
        }
        else {
          setPreviewContext(false)
        }
      } else {
        view.current = false
      }
    }
  }

  return (
    <div>
      <div className='flex gap-2'>
        {viewSelection.map((view) => (
          <button type="button" className={classNames(
            view.current ? 'bg-postBorderColor text-white  hover:bg-buttonSelectedColor' : 'text-gray-700 hover:bg-buttonHoverColor hover:text-white',
            'rounded-md px-3 py-2 text-lg font-medium',
          )} id={view.name} onClick={handlePressed}>
            <h3 name={view.name}>{view.name}</h3>
          </button>
        ))}
      </div>
      {isPreviewContext ? <BlogPost {...{
        blog: {
          body: previewBody,
          author: "Tiana Montez",
          category: category,
          title: title,
          dateCreated: Date.now()
        }
      }} /> : <CreateEditContent {...{ content, setContent, setTitle, title, setCategory, category, coverImage, setCoverImage, existingCoverImage, inlineImages, setInlineImages, postId, setPostId, draftSaved, setDraftSaved }} />}
    </div>
  )
}
