'use client'

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchConfig, authHeaders, updatePost } from '../apis/blogs';
import { uploadImage, linkImagesToPost } from '../apis/images';
import { clearDraftCache } from '../apis/draftCache';
import axios from "axios";
import EditorToolbar from './EditorToolbar';
import TitleField from './TitleField';
import CategoryField from './CategoryField';
import CoverImageField from './CoverImageField';
import EditorField from './EditorField';
import PublishButton from './PublishButton';
import SaveDraftButton from './SaveDraftButton';

function createKey(title) {
  return title.toLowerCase().replace(/\s+/g, '-')
}

export default function CreateEditContent(props) {
  const router = useRouter();
  const editorRef = useRef(null);
  const [savingStatus, setSavingStatus] = useState(null)
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

  const handleSubmit = async (status) => {
    if (!props.coverImage && !props.existingCoverImage) {
      console.error("Error saving post: cover image is required")
      return
    }

    if (!props.category) {
      console.error("Error saving post: category is required")
      return
    }

    setSavingStatus(status)
    try {
      let catId = props.category.categoryId
      if (catId == null) {
        const response = await axios.post("http://localhost:8080/category", {
          CategoryName: props.category.categoryName
        }, { headers: authHeaders() })
        catId = response.data.categoryId
      }

      let coverImageObjectName = props.existingCoverImage
      if (props.coverImage) {
        const { objectName } = await uploadImage('post', props.coverImage)
        coverImageObjectName = objectName
      }

      const { body, objectNames } = await uploadInlineImages(props.content)

      const payload = {
        Title: props.title,
        Key: createKey(props.title),
        Author: "Tiana Montez",
        CategoryId: catId,
        CoverImage: coverImageObjectName,
        Body: body,
        Status: status,
      }

      let bid = props.postId
      if (bid) {
        await updatePost(bid, payload)
      } else {
        const response = await axios.post("http://localhost:8080/posts", payload, { headers: authHeaders() })
        bid = response.data.bid
        props.setPostId(bid)
      }

      await linkImagesToPost(bid, [coverImageObjectName, ...objectNames])

      clearDraftCache()

      if (status === 'published') {
        router.push(`/posts/${payload.Key}`)
      } else {
        props.setDraftSaved(true)
      }
    } catch (err) {
      console.error("Error saving post: ", err.message)
    } finally {
      setSavingStatus(null)
    }
  }

  return (
    <form>
      <div className="w-full mb-4 border border-default-medium rounded-base bg-neutral-secondary-medium shadow-xs">
        <EditorToolbar onImageSelect={handleImageSelect} />
        <TitleField value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
        <CategoryField categories={categories} category={props.category} setCategory={props.setCategory} />
        <CoverImageField file={props.coverImage} existingImage={props.existingCoverImage} onChange={props.setCoverImage} />
        <EditorField value={props.content} onChange={(e) => props.setContent(e.target.value)} textareaRef={editorRef} />
      </div>
      <div className="flex items-center gap-2">
        <SaveDraftButton onClick={() => handleSubmit('draft')} disabled={savingStatus !== null} />
        <PublishButton onClick={() => handleSubmit('published')} disabled={savingStatus !== null} />
        {props.draftSaved && <span className="text-sm text-body">Draft saved</span>}
      </div>
    </form>
  )
}
