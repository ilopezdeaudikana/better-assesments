import { Post } from '../common/types/post'
import postReducer, { setPosts, setInputValue } from './posts.slice'

describe('posts reducer', () => {
  const initialState = { list: {} }

  it('should handle initial state', () => {
    expect(postReducer(undefined, { type: 'unknown' })).toEqual({
      list: {}
    })
  })

  it('should handle grouped posts', () => {
    const posts: Record<string, Post[]> = {
      Miami: [
        {
          id: 1,
          location: 'Miami',
          time: '1552563973',
          author: 'yo',
          text: 'string'
        }
      ]
    }
    const actual = postReducer(initialState, setPosts(posts))
    expect(actual.list).toEqual(posts)
  })

  it('should handle input values', () => {
    const state = {
      list: {
        'Sydney': [
          {
            id: 4,
            location: 'Sydney',
            time: '1552563973',
            author: 'Happy Developer',
            text: 'An expectation of digital efficiency has become the norm in our daily lives',
            date: '19/01/1970'
          },
          {
            id: 2,
            location: 'Sydney',
            time: '1552571173',
            author: 'Happy User',
            text: 'The modern workplace is increasingly digital, and workflows are constantly evolving. ',
            date: '19/01/1970'
          }
        ]
      }
    }
    const action = {
        key: 'Sydney',
        input: 'location',
        id: 4,
        value: 'San Francisco',
        group: 'location'
      }
    const actual = postReducer(
      state,
      setInputValue(action)
    )
    // New node created with a key === 'San Francisco'
    expect((actual.list as any)[action.value]).toBeDefined()
  })
})
