'use client'

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchConfig, authHeaders } from '../apis/blogs';
import { uploadImage, linkImagesToPost } from '../apis/images';
import axios from "axios";
import EditorToolbar from './EditorToolbar';
import TitleField from './TitleField';
import CategoryField from './CategoryField';
import CoverImageField from './CoverImageField';
import EditorField from './EditorField';
import PublishButton from './PublishButton';

function createKey(title) {
  return title.toLowerCase().replace(/\s+/g, '-')
}

export default function CreateEditContent(props) {
  const router = useRouter();
  const editorRef = useRef(null);
  const { data } = fetchConfig("category")
  const categories = data ?? []

  const handleImageSelect = (file) => {
    const id = crypto.randomUUID()
    props.setInlineImages([...props.inlineImages, { id, file, url: URL.createObjectURL(file) }])

    const placeholder = `![${file.name}](inline://${id})`
    const editor = editorRef.current
    const start = editor?.selectionStart ?? props.content.length
    const end = editor?.selectionEnd ?? start
    props.setContent(props.content.slice(0, start) + placeholder + props.content.slice(end))
  }

  const uploadInlineImages = async (body) => {
    const objectNames = []
    for (const img of props.inlineImages) {
      const placeholder = `inline://${img.id}`
      if (!body.includes(placeholder)) continue
      const { objectName } = await uploadImage('post', img.file)
      objectNames.push(objectName)
      body = body.replaceAll(placeholder, `image://${encodeURIComponent(objectName)}`)
    }
    return { body, objectNames }
  }

  const handleSubmit = async () => {
    if (!props.coverImage) {
      console.error("Error creating post: cover image is required")
      return
    }

    let catId = 0
    if (props.category.categoryId == null) {
      try {
        const response = await axios.post("http://localhost:8080/category", {
          CategoryName: props.category.categoryName
        }, { headers: authHeaders() })
        catId = response.data.categoryId
      } catch (err) {
        console.error("Error creating category ", err.message)
      }
    } else {
      catId = props.category.categoryId
    }

    try {
      const { objectName } = await uploadImage('post', props.coverImage)
      const { body, objectNames } = await uploadInlineImages(props.content)

      const payload = {
        Title: props.title,
        Key: createKey(props.title),
        Author: "Tiana Montez",
        CategoryId: catId,
        CoverImage: objectName,
        Body: body,
      }
      const response = await axios.post("http://localhost:8080/posts", payload, { headers: authHeaders() })
      await linkImagesToPost(response.data.bid, [objectName, ...objectNames])
      router.push(`/posts/${payload.Key}`)
    } catch (err) {
      console.error("Error creating post: ", err.message)
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="w-full mb-4 border border-default-medium rounded-base bg-neutral-secondary-medium shadow-xs">
        <EditorToolbar onImageSelect={handleImageSelect} />
        <TitleField value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
        <CategoryField categories={categories} setCategory={props.setCategory} />
        <CoverImageField file={props.coverImage} onChange={props.setCoverImage} />
        <EditorField value={props.content} onChange={(e) => props.setContent(e.target.value)} textareaRef={editorRef} />
      </div>
      <PublishButton />
    </form>
  )
}
