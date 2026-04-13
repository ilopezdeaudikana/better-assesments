import { Post } from "../common/types/post"
import { groupPostsByWeek } from "../store/group-by.service"

export const getPosts = async () => {
  const response = await fetch('http://localhost:3001/api')
  const result = await response.json()

  const withDate = result.map((post: Post) => ({
    ...post,
    date: new Date(parseInt(post.time) * 1000).toLocaleString('en-GB'),
  }))
  return groupPostsByWeek(withDate)
}