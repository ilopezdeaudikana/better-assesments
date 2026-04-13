import { useEffect } from 'react'
import { ArticleFromApi, Article } from '../types/models'
import { mergeUsersAndPosts } from '../merge-users-and-posts'
import { PostCard } from '../card/post-card'
import { useOutletContext } from 'react-router-dom'
import { getUsers } from '../../api/api'
import { useUsers } from '../../store-articles/store'

export const OthersPosts = () => {
  const [posts, id] = useOutletContext<[posts: ArticleFromApi[], id: number]>()

  const setUsers = useUsers(state => state.setUsers)

  const users = useUsers((state) => state.users)
  const list: Article[] = mergeUsersAndPosts(users, posts, id)

  useEffect(() => {
    getUsers().then(result => setUsers(result))
  }, [])

  return (
    <>
      {list.map((post: Article) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  )
}
