import { create } from 'zustand'
import type { Post } from '../types/post'
import { changeGroups, groupPostsBy } from '../utils/group-by.service'
import type { DomPayload } from '../types/dom-payload'

interface PostStore {
  posts: Record<string, Post[]>,
  setPosts: (payload: Record<string, Post[]>) => void,
  setInputValue: (payload: DomPayload) => void
  groupBy: (key: string) => void
}
export const usePosts = create<PostStore>((set) => ({
  posts: {} as Record<string, Post[]>,
  setPosts: (payload: Record<string, Post[]>) => set(() => ({ posts: payload })),
  setInputValue: (payload: DomPayload) => set((state: PostStore) => {
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
  groupBy: (key: string) => set((state) => {
    const posts: Record<string, Post[]> = changeGroups(state.posts, key)
    return { posts }
  })
}))
