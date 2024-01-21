import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  ISignInUserData,
  ISignUpUserData,
  IUser,
  IUserDataFromServer,
} from '../../types/userDataTypes';
import { signInOnServer, signUpOnServer } from '../../api/authorization';

// import { RootState } from '../store';

export const signUp = createAsyncThunk<
  IUser,
  ISignUpUserData,
  { rejectValue: string }
>('user/signUp', async (userData, thunkApi) => {
  console.log('🚀 ~ file: user.actions.ts:11 ~ > ~ userData:', userData);

  // console.log("🚀 ~ file: user.actions.js:14 ~ thunkApi:", thunkApi)

  console.log('State in getUserById THUNK ---', thunkApi.getState());

  const user: IUserDataFromServer | null = await signUpOnServer(userData);

  if (user) {
    if (userData.remember) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
  } else {
    return thunkApi.rejectWithValue('Error message text');
  }
});

export const signIn = createAsyncThunk<
  IUserDataFromServer,
  ISignInUserData,
  { rejectValue: string }
>('user/signIn', async (userData, thunkApi) => {
  const user: IUserDataFromServer | null = await signInOnServer(userData);

  if (user?.status === 'success') {
    if (userData.remember) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
  } else {
    return thunkApi.rejectWithValue(user?.status || 'Error message text');
  }
});

export const getUserFromLS = createAsyncThunk<
  IUserDataFromServer,
  void,
  { rejectValue: string }
>('user/getUserFromLS', async (_, thunkApi) => {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  }

  return thunkApi.rejectWithValue('No used data in localStorage');
});
