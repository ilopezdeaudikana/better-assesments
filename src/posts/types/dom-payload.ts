import { Post } from "./post"

export type DomInput = Exclude<keyof Post, 'id'>

export interface DomPayload {
  key: string
  input: DomInput
  id: number
  value: string
  group: string
}