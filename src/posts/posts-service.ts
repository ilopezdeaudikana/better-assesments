import type { Post } from "../common/types/post.js"
import { groupPostsByWeek } from "../store/group-by.service.js"

export const getPosts = async () => {
  const response = await fetch('http://localhost:3001/posts')
  const result = await response.json()

  const withDate = result.map((post: Post) => ({
    ...post,
    date: new Date(parseInt(post.time) * 1000).toLocaleString('en-GB'),
  }))
  return groupPostsByWeek(withDate)
}