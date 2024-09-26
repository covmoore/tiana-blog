import {posts} from "./mockData/mockBlogs.js"

export function formatBody(body) {
  return (body.toString())
}
formatBody(posts[0].body)

