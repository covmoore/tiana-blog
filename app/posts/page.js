'use client'

import { usePathname } from 'next/navigation'
import { fetchBlogs, fetchConfig } from '../apis/blogs'
import { getCatColor, classNames } from '../utils'

export default function PostsPage({ params }) {
  const path = usePathname()
  const { data, loading, error } = fetchBlogs()
  const categoryConfig = fetchConfig("category")
  let blogs = [];
  if (data) {
    blogs = data;
  }

  let categoriesMap = {}
  if (categoryConfig.data) {
    const categories = categoryConfig.data;
    categories.forEach((cat) => {
      categoriesMap[cat.categoryName] = []
    })
    data?.forEach((blog) => {
      categoriesMap[blog.categoryName].push(blog)
    })
  }

  return (
    <div className="flex flex-col mx-8 my-4">
      <div className="flex justify-center text-5xl mb-12">
        Posts
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-16">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>error</p>}
        {categoryConfig && Object.entries(categoriesMap).map(([key, value]) => {
          return (
            <div>
              <div className={classNames(`bg-${getCatColor(key)}`, "flex drop-shadow-md px-1 font-medium rounded-md box-border max-w-fit max-h-fit")}>
                <h1 className='text-lg justify-center'>{key}</h1>
              </div>
              <div className="p-4 bg-background overflow-y-scroll max-w-96 max-h-[700px]">
                <div className="max-w-screen-xl  min-h-screen-m">
                  {data && value.map((blog) => {
                    console.log(`TITLE: ${blog.title}`)
                    return (
                      <a key={blog.key} href={`${path}/${blog.key}`}>
                        <div className={`flex flex-col mx-2 my-2 border-2 h-150 w-150 rounded-xl shadow-lg bg-postForegroundColor border-${getCatColor(blog.categoryName)} hover:bg-secondary hover:bg-opacity-30`}>
                          <div className="mx-3 my-5">
                            <div className="flex flex-row justify-between mb-24">
                              <text className="mr-6">{new Date(blog.dateCreated).toDateString()}</text>
                              <text className="ml-6">{blog.author}</text>
                            </div>
                            <div className="flex justify-center flex-wrap">
                              <text className="text-xl">{blog.title}</text>
                            </div>
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}
