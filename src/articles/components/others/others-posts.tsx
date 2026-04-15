import { Article } from '../../types/types'
import { mergeUsersAndPosts } from '../../utils/merge-users-and-posts'
import { ArticleCard } from '../card/article-card'
import { getUsers } from '../../services/users-service'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '../../store/store'
import { useArticles } from '../../hooks/useArticles'

export const OthersPosts = () => {

  const user = useUser(state => state.user)

  const { data } = useArticles()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 5 * 1000 * 60
  })

  const list: Article[] = mergeUsersAndPosts(query.data ?? [], data ?? [], user.id)

  return (
    <div className='flex flex-col gap-4'>
      {list.map((post: Article) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  )
}
