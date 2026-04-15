import { ChangeEvent, useEffect, useState } from 'react'
import { Post } from './types/post'
import { groupPostsByWeek } from './utils/group-by.service'
import { Tree } from './components/tree'
import { GroupButton } from './components/group-button'
import { usePosts } from './store/store'
import { getPosts } from './services/posts-service'
import { useQuery } from '@tanstack/react-query'

export const Posts = () => {
  const [group, setGroup] = useState('time')

  const setPosts = usePosts(state => state.setPosts)

  const groupBy = usePosts(state => state.groupBy)

  const query = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    select: (result) => {
      const withDate = result.map((post: Post) => ({
        ...post,
        time: new Date(parseInt(post.time) * 1000).toLocaleString('en-GB'),
      }))
      return groupPostsByWeek(withDate)
    },
    staleTime: 5 * 1000 * 60
  })

  useEffect(() => {
    // Need to be synced with the ui state because "posts" changes are never persisted
    setPosts(query.data ?? {})
  }, [query.data])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroup(e.target.value)
    groupBy(e.target.value)
  }

  return (
    <>
      <div className='w-[60rem] flex flex-col p-3 mx-auto my-2'>
        <div
          className='grid grid-cols-3 space-x-2 rounded-xl p-2 mx-auto my-2'
        >
          <GroupButton group={group} by='time' change={onChange} />
          <GroupButton group={group} by='location' change={onChange} />
          <GroupButton group={group} by='author' change={onChange} />
        </div>

        <Tree group={group} />
      </div>
    </>
  )
}
