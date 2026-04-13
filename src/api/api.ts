import { User, Article } from '../articles/types/models'

const server = 'https://jsonplaceholder.typicode.com'

export const getUsers = async (): Promise<User[]> => {
  const response: Response = await fetch(`${server}/users`)
  const users: User[] = await response.json()
  return users
}

export const getUser = async (email: string): Promise<User[]> => {
  const response: Response = await fetch(`${server}/users?email=${email}`)
  const users: User[] = await response.json()
  return users
}

export const getPosts = async (): Promise<Article[]> => {
  const response: Response = await fetch(`${server}/posts`)
  const posts: Article[] = await response.json()
  return posts
}

export const createPost = async (post: Article): Promise<{ id: number }> => {
  const response: Response = await fetch(`${server}/posts`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify(post),
  })
  const apiPost: { id: number } = await response.json()
  return apiPost
}
