import { PostApiResponse } from '../types/post'

export const getPosts = async () => {
  const response = await fetch('http://localhost:3001/posts')
  const result = await response.json()

  const parsed = PostApiResponse.safeParse(result)
  if (parsed.success) {
    return parsed.data
  } else {
    console.log('Error parsing Api Posts')
    return []
  }
}