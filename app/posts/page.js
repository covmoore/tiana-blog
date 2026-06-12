'use client'

import { usePathname } from 'next/navigation'
import { fetchBlogs, fetchConfig } from '../apis/blogs'
import { getImageUrl } from '../apis/images'
import { getCatColor, classNames } from '../utils'
import { useAuth } from '../hooks/useAuth'
import fallbackCoverImage from '../../public/dawg.png'

export default function PostsPage({ params }) {
  const path = usePathname()
  const { isAuthenticated } = useAuth()
  const { data, loading, error } = fetchBlogs(isAuthenticated)
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
        {categoryConfig && Object.entries(categoriesMap).filter(([, value]) => value.length > 0).map(([key, value]) => {
          return (
            <div>
              <div className={classNames(`bg-${getCatColor(key)}`, "flex drop-shadow-md px-1 font-medium rounded-md box-border max-w-fit max-h-fit")}>
                <h1 className='text-lg justify-center'>{key}</h1>
              </div>
              <div className="p-4 bg-background overflow-y-scroll max-w-96 max-h-[700px]">
                <div className="max-w-screen-xl  min-h-screen-m">
                  {data && value.map((blog) => {
                    const isDraft = blog.status === 'draft'
                    const route = isDraft ? `/create?postId=${blog.bid}` : `${path}/${blog.key}`
                    const coverImageSrc = blog.coverImage ? getImageUrl(blog.coverImage) : fallbackCoverImage.src
                    return (
                      <a key={blog.key || blog.bid} href={route}>
                        <div className={classNames(
                          isDraft ? 'bg-draftGray/90 hover:bg-draftGray' : 'bg-postForegroundColor/90 hover:bg-postForegroundColor',
                          `relative isolate overflow-hidden flex flex-col mx-2 my-2 border-2 h-150 w-150 rounded-xl shadow-lg border-${getCatColor(blog.categoryId)} hover:bg-secondary hover:bg-opacity-30`
                        )}>
                          <div
                            className={classNames("absolute inset-0 -z-10 bg-cover bg-center", isDraft ? "opacity-30" : "opacity-40")}
                            style={{ backgroundImage: `url(${coverImageSrc})` }}
                          />
                          <div className="mx-3 my-5">
                            <div className="flex flex-row justify-between mb-24">
                              <text className="mr-6">{blog.dateCreated ? new Date(blog.dateCreated).toDateString() : '-'}</text>
                              {isAuthenticated && <text className="font-medium uppercase">{blog.status}</text>}
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
