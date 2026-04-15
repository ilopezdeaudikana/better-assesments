import { User, ApiArticle, Article } from '../types/types'

export const mergeUsersAndPosts = (
  users: User[],
  posts: ApiArticle[],
  id: number
): Article[] => {

  const othersPosts = posts?.filter(
    (post) => post.userId !== id
  )
  return othersPosts.map((post) => {
    const user = users.find((user: User) => user.id === post.userId)
    return { ...post, userName: user ? user.name : '', userEmail: user ? user.email : '' }
  })
}
