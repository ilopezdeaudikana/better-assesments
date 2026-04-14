import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Post } from '../common/types/post'
import { changeGroups } from '../store/group-by.service'
import { Tree } from './Tree'
import { GroupButton } from './GroupButton'
import { usePosts } from '../store/store'
import { getPosts } from './posts-service'

export const Posts = () => {
  const [group, setGroup] = useState('time')

  const posts: Record<string, Post[]> = usePosts(state => state.posts)
  const setPosts = usePosts(state => state.setPosts)

  const groupBy = (key: string, list: Record<string, Post[]>) => {
    const posts: Record<string, Post[]> = changeGroups(list, key)
    setPosts(posts)
  }
  useEffect(() => {
    getPosts().then(result => setPosts(result))
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroup(e.target.value)
    groupBy(e.target.value, posts)
  }

  return (
    <Fragment>
      <div
        className='grid w-[30rem] grid-cols-3 space-x-2 rounded-xl bg-gray-200 p-2 mx-auto my-2'
      >
        <GroupButton group={group} by='time' change={onChange} />
        <GroupButton group={group} by='location' change={onChange} />
        <GroupButton group={group} by='author' change={onChange} />
      </div>

      <Tree group={group} />
    </Fragment>
  )
}
