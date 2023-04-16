import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Post } from "../common/types/post";


interface DomAction {
  key: string;
  input: string;
  index: number;
  value: string;
}

const postSlice = createSlice({
  name: 'post',
  initialState: { list: {} },
  reducers: {
    fetchSucceded(state, action: PayloadAction<Post[]>) {
      state.list = action.payload
    },
    setPosts(state, action: PayloadAction<Record<string, Post[]>>) {
      state.list = action.payload
    },
    setInputValue(state, action: PayloadAction<DomAction>) {
      const { list }: {list: Record<string, Post[]>} = state;
      const { key, index, input, value } = action.payload;
      const post: Post = { ...list[key][index] };
      post[input] = value;
      const newPostsArray: Post[] = [...list[key]];
      newPostsArray[index] = post;
      state.list = { ...list, [key]: [...newPostsArray] }
    }
  }
})

export const { fetchSucceded, setPosts, setInputValue } = postSlice.actions;
export default postSlice.reducer;