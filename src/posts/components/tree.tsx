import { usePosts } from '../store/store'

export const Tree = (props: { group: string }) => {
  const posts = usePosts(state => state.posts)
  const setInputValue = usePosts(state => state.setInputValue)

  const onSubmit = (key: string, input: string, id: number, value: string) => {
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
    </>
  )
}
