import { useCallback, useMemo, useRef } from 'react'
import { Post, PostsState } from '../common/types/post'
import { RootState } from '../store/store'
import styled from 'styled-components'
import { useAppSelector } from '../store/hooks'

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 5rem;
  color: #444;
`

export const Section = styled.div`
  max-width: ${(props: { max: string }) => props.max};
  > * {
    margin: 1rem;
  }
`

const calculateTree = (
  keys: string[],
  group: string,
  handler: Function,
  list: Record<string, Post[]>
) =>
  keys.map((key) => {
    return {
      title: key,
      key: `${key}-0`,
      children: list[key].map((item, i) => {
        return {
          title: (
            <Card>
              <p>{item.date}</p>
              <Section max={'12rem'}>
                <p>{item.text}</p>
              </Section>
              <label>
                Author
                <input
                  name='author'
                  defaultValue={item.author}
                  onBlur={(e) =>
                    handler(key, 'author', item.id, e.target.value, group)
                  }
                />
              </label>
              <label>
                Location
                <input
                  name='location'
                  defaultValue={item.location}
                  onBlur={(e) =>
                    handler(key, 'location', item.id, e.target.value, group)
                  }
                />
              </label>
            </Card>
          ),
          key: `${key}-0-0-${item.id}`
        }
      })
    }
  })
export const useTree = (callback: Function, group: string) => {

  const posts: PostsState = useAppSelector((state: RootState) => state.posts)

  const handler = useCallback((...args: any) => callback(...args), [callback])

  const list = useMemo(() => posts.list, [posts.list])

  const tree = useRef([] as any)

  const keys = Object.keys(list)
  tree.current = calculateTree(keys, group, handler, list)

  return [tree]
}
