import { createSlice } from '@reduxjs/toolkit';

import { IExtendedUser } from '../../types/userDataTypes';

import { getUserFromLS, signIn, signUp } from './user.actions';
import { RequestStatusEnum } from '../../types/enums';

const initialUserState: IExtendedUser = {
  userData: {
    userName: null,
    id: null,
  },
  isAuth: false,
  signXStatus: RequestStatusEnum.NOT_STARTED,
  error: null,
  status: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    logout: () => {
      localStorage.clear();

      return initialUserState;
    },
  },
  extraReducers: builder => {
    //#region --- signUp ---
    builder.addCase(signUp.pending, state => {
      state.signXStatus = RequestStatusEnum.PENDING;
    });

    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.userData.id = payload.id;
      state.userData.userName = payload.userName;

      state.signXStatus = RequestStatusEnum.COMPLETE;
      state.isAuth = true;
    });

    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.signXStatus = RequestStatusEnum.ERROR;
      state.error = payload;
    });
    //#endregion

    //#region --- SignIn ---
    builder.addCase(signIn.pending, state => {
      state.signXStatus = RequestStatusEnum.PENDING;
    });

    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.userData.id = payload.id;
      state.userData.userName = payload.userName;

      state.signXStatus = RequestStatusEnum.COMPLETE;
      state.isAuth = true;
    });

    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.signXStatus = RequestStatusEnum.ERROR;
      state.error = payload;
    });
    //#endregion

    //#region  --- getUserFromLS ---
    builder.addCase(getUserFromLS.pending, state => {
      state.signXStatus = RequestStatusEnum.PENDING;
    });

    builder.addCase(getUserFromLS.fulfilled, (state, { payload }) => {
      state.userData.id = payload.id;
      state.userData.userName = payload.userName;

      state.signXStatus = RequestStatusEnum.COMPLETE;
      state.isAuth = true;
    });

    builder.addCase(getUserFromLS.rejected, state => {
      state.signXStatus = RequestStatusEnum.NOT_STARTED;
    });
    //#endregion
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
