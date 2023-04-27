import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Post } from '../common/types/post'
import { groupPostsBy } from '../store/group-by.service'

interface DomAction {
  key: string
  input: string
  id: number
  value: string
  group: string
}

const postSlice = createSlice({
  name: 'post',
  initialState: { list: {} },
  reducers: {
    setPosts(state, action: PayloadAction<Record<string, Post[]>>) {
      state.list = action.payload
    },
    setInputValue(state, action: PayloadAction<DomAction>) {
      const newList: Record<string, Post[]> = { ...state.list }
      const { key, id, input, value, group } = action.payload
      const post: Post | undefined = newList[key].find((item) => item.id === id)
      const posts = Object.keys(newList).reduce<Post[]>((acc, key) => acc.concat(newList[key]),[]).filter(item => item.id !== id)
      if (post) {
        post[input] = value
        posts.push(post)
        groupPostsBy(posts, group)
        state.list = { ...groupPostsBy(posts, group) }
      }
    }
  }
})

export const { setPosts, setInputValue } = postSlice.actions
export default postSlice.reducer
