import { Article, User } from '../articles/types/models'
import { create } from 'zustand'

interface ArticleStore {
  articles: Article[], setArticles: (payload: Article[]) => void, setNewArticle: (payload: Article) => void
}
export const useArticles = create<ArticleStore>((set) => ({
  articles: [],
  setArticles: (payload: Article[]) => set(() => ({ articles: payload })),
  setNewArticle: (payload: Article) => set((state: ArticleStore) => ({ articles: state.articles.concat(payload) })),
}))

export const useUsers = create<{ users: User[], setUsers: (users: User[]) => void }>((set) => ({
  users: [] as User[],
  setUsers: (payload: User[]) => set(() => ({ users: payload })),
}))

export const useUser = create<{ user: User, setUser: (user: User) => void }>((set) => ({
  user: {} as User,
  setUser: (payload: User) => set(() => ({ user: payload })),
}))