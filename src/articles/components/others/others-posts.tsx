import { useEffect } from 'react'
import { ApiArticle, Article, UserApiResponse } from '../../types/types'
import { mergeUsersAndPosts } from '../../utils/merge-users-and-posts'
import { ArticleCard } from '../card/article-card'
import { useOutletContext } from 'react-router-dom'
import { getUsers } from '../../services/users-service'
import { useUsers } from '../../store/store'

export const OthersPosts = () => {
  const [posts, id] = useOutletContext<[posts: ApiArticle[], id: number]>()

  const setUsers = useUsers(state => state.setUsers)

  const users = useUsers((state) => state.users)

  const list: Article[] = mergeUsersAndPosts(users, posts, id)

  useEffect(() => {
    getUsers().then(result => {
      const parsed = UserApiResponse.safeParse(result)
      if (parsed.success) setUsers(parsed.data)
      else console.log('Error parsing users from API')
    })
  }, [])

  return (
    <>
      {list.map((post: Article) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </>
  )
}
