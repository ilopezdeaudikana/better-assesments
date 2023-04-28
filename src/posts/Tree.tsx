import { Fragment } from 'react'
import { PostsState } from '../common/types/post'
import { RootState } from '../store/store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setInputValue } from './posts.slice'

export const Tree = (props: { group: string }) => {
  const posts: PostsState = useAppSelector((state: RootState) => state.posts)
  const dispatch = useAppDispatch()

  const onSubmit = (key: string, input: string, id: number, value: string) => {
    dispatch(
      setInputValue({
        key,
        input,
        id,
        value,
        group: props.group
      })
    )
  }
  return (
    <Fragment>
      {Object.keys(posts.list).map((key) => (
        <ul key={key}>
          {key}
          {posts.list[key].map((item) => (
            <li
              key={item.id}
              className='w-[30rem] flex flex-col p-3 rounded-xl bg-gray-200 mx-auto my-2'
            >
              <p className='text-left'>{item.date}</p>
              <div className='my-2'>
                <p className='text-left'>{item.text}</p>
              </div>
              <div className='flex flex-row justify-between my-1'>
                <label htmlFor='author'>Author</label>
                <input
                  className='p-1 rounded-sm'
                  name='author'
                  id='author'
                  defaultValue={item.author}
                  onBlur={(e) =>
                    onSubmit(key, 'author', item.id, e.target.value)
                  }
                />
              </div>
              <div className='flex flex-row justify-between'>
                <label htmlFor='location'>Location</label>
                <input
                  className='p-1 rounded-sm'
                  name='location'
                  id='location'
                  defaultValue={item.location}
                  onBlur={(e) =>
                    onSubmit(key, 'location', item.id, e.target.value)
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      ))}
    </Fragment>
  )
}
