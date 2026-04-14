import { useOutletContext } from 'react-router-dom'
import { ApiArticle, Article } from '../../types/types'
import { NewPost } from '../new/new-post'
import { ArticleCard } from '../../components/card/article-card'

export const MyPosts = () => {
  const [posts, id] = useOutletContext<[posts: ApiArticle[], id: number]>()
  const list = posts?.filter((post: ApiArticle) => post.userId === id)
  return (
    <>
      <NewPost userId={id} />
      {list.map((post: Article) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </>
  )
}
