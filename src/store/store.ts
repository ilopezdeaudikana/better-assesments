import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import counterReducer from '../counter/counterSlice';
import postReducer from '../posts/posts.slice'
import postsSaga from './sagas/posts.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer
  },
  middleware: (getDefaultMiddleware) => {
    // Normally will disable thunks { thunk: false }
    return getDefaultMiddleware().prepend(sagaMiddleware);
  }
});

sagaMiddleware.run(postsSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
