import { Fragment, useEffect, useState } from 'react'
import { Tree, Radio, RadioChangeEvent } from 'antd'
import { PostsState, Post } from '../common/types/post'
import { fetchPostsAction } from '../store/actions/actions'
import { RootState } from '../store/store'
import { changeGroups } from '../store/group-by.service'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setInputValue, setPosts } from './posts.slice'
import { useTree } from './useTree'


export const Posts = () => {
  const [group, setGroup] = useState('time')

  const posts: PostsState = useAppSelector((state: RootState) => state.posts)
  const dispatch = useAppDispatch()

  const onSubmit = (
    key: string,
    input: string,
    id: number,
    value: string,
    group: string
  ) => {
    dispatch(
      setInputValue({
        key,
        input,
        id,
        value,
        group
      })
    )
  }

  const groupBy = (key: string, list: Record<string, Post[]>) => {
    const posts: Record<string, Post[]> = changeGroups(list, key)
    dispatch(setPosts(posts))
  }
  useEffect(() => {
    dispatch(fetchPostsAction())
  }, [dispatch])

  
  const [treeNodes] = useTree(onSubmit, group)

  console.log('new refresh', posts.list) 

  const onChange = (e: RadioChangeEvent) => {
    setGroup(e.target.value)
    groupBy(e.target.value, posts.list)
  }

  return (
    <Fragment>
      <Radio.Group onChange={onChange} value={group}>
        <Radio value={'author'}>By Author</Radio>
        <Radio value={'location'}>By Location</Radio>
        <Radio value={'time'}>By Week</Radio>
      </Radio.Group>
      
      <Tree checkable treeData={(treeNodes as any).current as any} />
    </Fragment>
  )
}
