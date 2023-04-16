export interface Post {
  id: number
  location: string
  time: string
  author: string
  text: string
  [key: string]: string | number
}

export interface PostsState {
  list: Record<string, Post[]>
}

export enum Groupable {
  Author = 'author',
  Location = 'location',
  Time = 'time',
  Week = 'Week'
}
