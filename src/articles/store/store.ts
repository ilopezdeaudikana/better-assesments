import { Article, User } from '../types/types'
import { create } from 'zustand'

export const useUser = create<{ user: User, setUser: (user: User) => void }>((set) => ({
  user: {} as User,
  setUser: (payload: User) => set(() => ({ user: payload })),
}))