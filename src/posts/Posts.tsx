import { Fragment, useEffect, useState } from 'react';
import { Tree, Radio, RadioChangeEvent } from 'antd';
import { PostsState, Post } from '../common/types/post';
import {
  fetchPostsAction,
} from '../store/actions/actions';
import { RootState } from '../store/store';
import { changeGroups } from '../store/group-by.service';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setInputValue, setPosts } from './posts.slice';

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 5rem;
  color: #444;
`;

export const Section = styled.div`
  max-width: ${(props: { max: string }) => props.max};
  > * {
    margin: 1rem;
  }
`;

const fromObjToTree = (posts: PostsState, callback: any) => {
  return Object.keys(posts.list).map((key) => {
    return {
      title: key,
      key: `${key}-0`,
      children: posts.list[key].map((item, i) => {
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
                  value={item.author}
                  onChange={(e) => callback(key, 'author', i, e.target.value)}
                />
              </label>
              <label>
                Location
                <input
                  name='location'
                  value={item.location}
                  onChange={(e) => callback(key, 'location', i, e.target.value)}
                />
              </label>
            </Card>
          ),
          key: `${key}-0-0-${i}`,
        };
      }),
    };
  });
};

export const Posts = () => {
  const [value, setValue] = useState('time');

  const posts: PostsState = useAppSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();


    const onSubmit = (key: string, input: string, index: number, value: string) => {
      dispatch(
        setInputValue({
          key,
          input,
          index,
          value,
        })
      );
    }
    const groupBy = (key: string, list: Record<string, Post[]>) => {
      const posts: Record<string, Post[]> = changeGroups(list, key);
      dispatch(setPosts(posts));
    }
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);


  const treeData = fromObjToTree(posts, onSubmit);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    groupBy(e.target.value, posts.list);
  };

  return (
    <Fragment>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={'author'}>By Author</Radio>
        <Radio value={'location'}>By Location</Radio>
        <Radio value={'time'}>By Week</Radio>
      </Radio.Group>

      <Tree checkable treeData={treeData} />
    </Fragment>
  );
};


