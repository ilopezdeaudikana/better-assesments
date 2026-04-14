import { ApiArticle, Article } from '../../types/types'
import { mergeUsersAndPosts } from '../../utils/merge-users-and-posts'
import { ArticleCard } from '../card/article-card'
import { useOutletContext } from 'react-router-dom'
import { getUsers } from '../../services/users-service'
import { useQuery } from '@tanstack/react-query'

export const OthersPosts = () => {
  const [posts, id] = useOutletContext<[posts: ApiArticle[], id: number]>()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 5 * 1000 * 60
  })

  const list: Article[] = mergeUsersAndPosts(query.data ?? [], posts, id)

  return (
    <>
      {list.map((post: Article) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </>
  )
}
