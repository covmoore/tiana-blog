//import {posts} from "./mockData/mockBlogs.js"

export function formatBody(body) {
  return (body.toString())
}
//formatBody(posts[0].body)

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NUM_CATEGORY_COLORS = 7

export function getCatColor(categoryId) {
  const index = ((categoryId % NUM_CATEGORY_COLORS) + NUM_CATEGORY_COLORS) % NUM_CATEGORY_COLORS
  return `categoryColor${index + 1}`
}
