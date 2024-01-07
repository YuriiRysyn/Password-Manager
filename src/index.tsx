import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { reducer } from './redux/reducer';

import App from './components/App';

const store = createStore(reducer, applyMiddleware(thunk));

// export type AppDispatch = typeof store.dispatch

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Логіку щодо useAppDispatch та useAppSelector взято з оф документації по Redux+TS
// https://redux.js.org/tutorials/typescript-quick-start

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  // </React.StrictMode>
);
