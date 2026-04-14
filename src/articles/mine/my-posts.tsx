import { useOutletContext } from 'react-router-dom'
import { ArticleFromApi, Article } from '../types/models'
import { NewPost } from '../new/new-post'
import { PostCard } from '../card/post-card'

export const MyPosts = () => {
  const [posts, id] = useOutletContext<[posts: ArticleFromApi[], id: number]>()
  const list = posts?.filter((post: ArticleFromApi) => post.userId === id)
  return (
    <>
      <NewPost userId={id} />
      {list.map((post: Article) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  )
}
