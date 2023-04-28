import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { PostsState, Post } from '../common/types/post'
import { fetchPostsAction } from '../store/actions/actions'
import { RootState } from '../store/store'
import { changeGroups } from '../store/group-by.service'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setPosts } from './posts.slice'
import { Tree } from './Tree'
import { GroupButton } from './GroupButton'

export const Posts = () => {
  const [group, setGroup] = useState('time')

  const posts: PostsState = useAppSelector((state: RootState) => state.posts)
  const dispatch = useAppDispatch()

  const groupBy = (key: string, list: Record<string, Post[]>) => {
    const posts: Record<string, Post[]> = changeGroups(list, key)
    dispatch(setPosts(posts))
  }
  useEffect(() => {
    dispatch(fetchPostsAction())
  }, [dispatch])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroup(e.target.value)
    groupBy(e.target.value, posts.list)
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
