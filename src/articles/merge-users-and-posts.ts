import { User, ArticleFromApi, Article } from './types/models'

export const mergeUsersAndPosts = (
  users: User[],
  posts: ArticleFromApi[],
  id: number
): Article[] => {
  const othersPosts = posts.filter(
    (post: ArticleFromApi) => post.userId !== id
  )
  return othersPosts.map((post: ArticleFromApi) => {
    const user = users.find((user: User) => user.id === post.userId)
    return { ...post, username: user ? user.name : '' }
  })
}
