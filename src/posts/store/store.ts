import { create } from 'zustand'
import { Post } from '../types/post'
import { groupPostsBy } from '../utils/group-by.service'

interface DomAction {
  key: string
  input: string
  id: number
  value: string
  group: string
}

interface PostStore {
  posts: Record<string, Post[]>,
  setPosts: (payload: Record<string, Post[]>) => void,
  setInputValue: (payload: DomAction) => void
}
export const usePosts = create<PostStore>((set) => ({
  posts: {} as Record<string, Post[]>,
  setPosts: (payload: Record<string, Post[]>) => set(() => ({ posts: payload })),
  setInputValue: (payload: DomAction) => set((state: PostStore) => {
    const newList: Record<string, Post[]> = { ...state.posts }
    const { key, id, input, value, group } = payload
    const post: Post | undefined = newList[key].find((item) => item.id === id)
    const posts = Object.keys(newList).reduce<Post[]>((acc, key) => acc.concat(newList[key]), []).filter(item => item.id !== id)
    if (post) {
      post[input] = value
      posts.push(post)
      groupPostsBy(posts, group)
      return { posts: { ...groupPostsBy(posts, group) } }
    } else {
      return state.posts
    }
  }),
}))
