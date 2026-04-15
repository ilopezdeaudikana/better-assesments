import { ApiArticle, Article } from '../../types/types'
import { NewArticle } from '../new/new-article'
import { ArticleCard } from '../card/article-card'
import { useArticles } from '../../hooks/useArticles'
import { useUser } from '../../store/store'

export const MyPosts = () => {

  const user = useUser(state => state.user)  

  const { data } = useArticles()
  const list = data?.filter((post: ApiArticle) => post.userId === user.id)

  return (
    <div className="flex flex-col gap-4">
      <NewArticle userId={user.id} />
      {list?.map((post: Article) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  )
}
