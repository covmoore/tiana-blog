//import {posts} from "./mockData/mockBlogs.js"

export function formatBody(body) {
  return (body.toString())
}
//formatBody(posts[0].body)

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function getCatColor(category) {
  switch(category) {
    case "books":
      return "bookColor"
    case "movies":
      return "movieColor"
    case "music":
      return "musicColor"
    default:
      return "black"
  }
}