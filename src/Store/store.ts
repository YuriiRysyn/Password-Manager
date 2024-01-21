import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import userSlice from './user/user.slice';
import dashboardSlice from './dashboard/dashboard.slice';

export const store = configureStore({
  reducer: { user: userSlice, dashboardItems: dashboardSlice },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
