import differenceInWeeks from 'date-fns/differenceInWeeks'
import { Post, Groupable } from '../common/types/post'

export const groupPostsBy = (
  collection: Post[],
  property: string
): Record<string, Post[]> => {
  return collection.reduce(
    (accumulator: Record<string, Post[]>, post: Post) => {
      const key = post[property]
      if (!accumulator[key]) {
        accumulator[key] = []
      }
      accumulator[key].push(post)
      return accumulator
    },
    {}
  )
}

export const groupPostsByWeek = (
  collection: Post[]
): Record<string, Post[]> => {
  const sortedCollection = collection.sort((a, b) =>
    parseInt(a.time) > parseInt(b.time) ? 1 : -1
  )
  let currentKey = `${Groupable.Week} 1`
  return sortedCollection.reduce(
    (accumulator: Record<string, Post[]>, post: Post, i: number) => {
      if (i === 0) {
        accumulator[currentKey] = []
      } else {
        const weeksDiff = differenceInWeeks(
          parseInt(sortedCollection[i].time),
          parseInt(sortedCollection[i - 1].time)
        )
        if (weeksDiff !== 0) {
          currentKey = `${Groupable.Week} ${i}`
          accumulator[currentKey] = []
        }
      }
      accumulator[currentKey].push(post)
      return accumulator
    },
    {}
  )
}

export const changeGroups = (
  collection: Record<string, Post[]>,
  property: string
): Record<string, Post[]> => {
  const keys = Object.keys(collection)
  const rawPosts = keys.reduce(
    (accumulator: Post[], key) => accumulator.concat(collection[key]),
    []
  )
  return property === Groupable.Time
    ? groupPostsByWeek(rawPosts)
    : groupPostsBy(rawPosts, property)
}
