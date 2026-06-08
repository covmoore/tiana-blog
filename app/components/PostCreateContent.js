import CreateEditContent from "./CreateEditContent";
import { useState } from "react"
import { classNames } from "../utils";
import BlogPost from "./BlogPost";

const viewSelection = [
  { name: "Edit", current: true },
  { name: "Preview", current: false }
]

export default function PostCreateContent() {
  const [isPreviewContext, setPreviewContext] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);

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
          body: content,
          author: "Tiana Montez",
          category: category,
          title: title,
          dateCreated: Date.now()
        }
      }} /> : <CreateEditContent {...{ content, setContent, setTitle, title, setCategory, category }} />}
    </div>
  )
}
