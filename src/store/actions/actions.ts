import {
  POSTS_FETCH_REQUESTED,
} from "../sagas/posts.saga";

export const fetchTodosAction = () => ({
  type: POSTS_FETCH_REQUESTED,
  payload: null,
});
