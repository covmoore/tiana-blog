'use client'

import { useRouter } from 'next/navigation';
import { fetchConfig, authHeaders } from '../apis/blogs';
import axios from "axios";
import EditorToolbar from './EditorToolbar';
import TitleField from './TitleField';
import CategoryField from './CategoryField';
import EditorField from './EditorField';
import PublishButton from './PublishButton';

function createKey(title) {
  return title.toLowerCase().replace(/\s+/g, '-')
}

export default function CreateEditContent(props) {
  const router = useRouter();
  const { data } = fetchConfig("category")
  const categories = data ?? []

  const handleSubmit = async () => {
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
      const payload = {
        Title: props.title,
        Key: createKey(props.title),
        Author: "Tiana Montez",
        CategoryId: catId,
        Image: null,
        Body: props.content,
      }
      await axios.post("http://localhost:8080/posts", payload, { headers: authHeaders() })
      router.push(`/posts/${payload.Key}`)
    } catch (err) {
      console.error("Error creating post: ", err.message)
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="w-full mb-4 border border-default-medium rounded-base bg-neutral-secondary-medium shadow-xs">
        <EditorToolbar />
        <TitleField value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
        <CategoryField categories={categories} setCategory={props.setCategory} />
        <EditorField value={props.content} onChange={(e) => props.setContent(e.target.value)} />
      </div>
      <PublishButton />
    </form>
  )
}
