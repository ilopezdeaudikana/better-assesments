import * as z from 'zod'

export const PostObject = z.object({
  id: z.number(),
  location: z.string(),
  time: z.string(),
  author: z.string(),
  text: z.string()
})

export type Post = z.infer<typeof PostObject>

export const PostApiResponse = z.array(PostObject)

export enum Groupable {
  Author = 'author',
  Location = 'location',
  Time = 'time',
  Week = 'Week'
}
