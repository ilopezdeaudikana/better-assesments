import { Card } from '@mui/material'
import { usePosts } from '../store/store'
import { DomInput } from '../types/dom-payload'

export const Tree = (props: { group: string }) => {
  const posts = usePosts(state => state.posts)
  const setInputValue = usePosts(state => state.setInputValue)

  const onSubmit = (key: string, input: DomInput, id: number, value: string) => {
    setInputValue({
      key,
      input,
      id,
      value,
      group: props.group
    })
  }
  return (
    <>
      {Object.keys(posts).map((key) => (
        <ul key={key}>
          {key}
          {posts[key].map((item) => (
            <li
              key={item.id}
            >
              <Card className='flex flex-col p-3 my-3 text-left'>
                <p>{item.time}</p>
                <div className='my-2'>
                  <p>{item.text}</p>
                </div>
                <div className='flex flex-row gap-4 my-1'>
                  <label htmlFor='author' className='pt-2'>Author</label>
                  <input
                    className='p-1 rounded-sm border-2 border-indigo-500/25'
                    name='author'
                    id='author'
                    defaultValue={item.author}
                    onBlur={(e) =>
                      onSubmit(key, 'author', item.id, e.target.value)
                    }
                  />
                </div>
                <div className='flex flex-row gap-4'>
                  <label htmlFor='location' className='pt-2'>Location</label>
                  <input
                    className='p-1 rounded-sm border-2 border-indigo-500/25'
                    name='location'
                    id='location'
                    defaultValue={item.location}
                    onBlur={(e) =>
                      onSubmit(key, 'location', item.id, e.target.value)
                    }
                  />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      ))}
    </>
  )
}
