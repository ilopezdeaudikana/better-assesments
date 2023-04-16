import { call, put, takeLatest } from 'redux-saga/effects';
import { Post } from '../../common/types/post';
import { groupPostsByWeek } from '../group-by.service';
import { fetchSucceded } from '../../posts/posts.slice';

export const api = {
  getTodos() {
    return fetch('http://localhost:3001/api')
      .then((response) => response.json())
      .then((response) => {
        const withDate = response.map((post: Post) => ({
          ...post,
          date: new Date(parseInt(post.time)).toLocaleDateString('en-GB'),
        }));
        return groupPostsByWeek(withDate);
      });
  },
};

export const POSTS_FETCH_REQUESTED = 'POSTS_FETCH_REQUESTED';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTodos() {
  try {
    const posts: Post[] = yield call(api.getTodos);
    yield put(fetchSucceded(posts));
  } catch (e: any) {
    console.log(e);
    yield put({ type: 'POSTS_FETCH_FAILED', message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `POSTS_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* postsSaga() {
  yield takeLatest(POSTS_FETCH_REQUESTED, fetchTodos);
}

export default postsSaga;
