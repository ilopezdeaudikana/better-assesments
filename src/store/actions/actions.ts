import {
  POSTS_FETCH_REQUESTED,
} from "../sagas/posts.saga";

export const fetchPostsAction = () => ({
  type: POSTS_FETCH_REQUESTED,
  payload: null,
});
