import { Dispatch } from 'redux';

import { signUpOnServer, signInOnServer } from '../api/authorization';

import {
  IExtendedUser,
  ISignInUserData,
  ISignUpUserData,
  IUser,
} from '../types/userDataTypes';

import { RequestStatusEnum, UserLoginActionsEnum } from './constants';

export interface ISignUpAction {
  type: UserLoginActionsEnum;
  signUpRequestStatus: RequestStatusEnum;
}

// export interface Action<P> {
//   readonly type: UserLoginActionsEnum;
//   readonly payload?: P;
// }

// Sign Up actions
const signUpPending = (): ISignUpAction => ({
  type: UserLoginActionsEnum.SIGN_UP,
  signUpRequestStatus: RequestStatusEnum.PENDING,
});

const signUpError = (): ISignUpAction => ({
  type: UserLoginActionsEnum.SIGN_UP,
  signUpRequestStatus: RequestStatusEnum.ERROR,
});

// export type SignUpSuccessActionType = ISignUpAction & IUserData;

interface ISignUpSuccess extends ISignUpAction, IUser {
  isAuth: boolean;
}

const signUpSuccess = (userData: IExtendedUser): ISignUpSuccess => ({
  type: UserLoginActionsEnum.SIGN_UP,
  ...userData,
  signUpRequestStatus: RequestStatusEnum.COMPLETE,
  isAuth: true,
});

export const signUp =
  (userData: ISignUpUserData) => async (dispatch: Dispatch) => {
    dispatch(signUpPending());

    const user = await signUpOnServer(userData);

    if (user) {
      if (userData.remember) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      dispatch(signUpSuccess(user));
    } else {
      dispatch(signUpError());
    }
  };

// Sign In actions
export interface ISignInAction {
  type: UserLoginActionsEnum;
  signInRequestStatus: RequestStatusEnum;
  error?: string;
}

const signInPending = (): ISignInAction => ({
  type: UserLoginActionsEnum.SIGN_IN,
  signInRequestStatus: RequestStatusEnum.PENDING,
});

const signInError = (error?: string): ISignInAction => ({
  error,
  type: UserLoginActionsEnum.SIGN_IN,
  signInRequestStatus: RequestStatusEnum.ERROR,
});

const signInSuccess = (userData: Partial<IExtendedUser>) => ({
  type: UserLoginActionsEnum.SIGN_IN,
  signInRequestStatus: RequestStatusEnum.COMPLETE,
  isAuth: true,
  ...userData,
});

export const signIn =
  (userData: ISignInUserData) => async (dispatch: Dispatch) => {
    dispatch(signInPending());

    const user = await signInOnServer(userData);

    if (user && user.status === 'success') {
      if (userData.remember) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      dispatch(signInSuccess(user));
    } else if (user && user.status) {
      const error = user.status;

      dispatch(signInError(error));
    } else {
      dispatch(signInError());
    }
  };

export const getUserFromLS =
  () =>
  (dispatch: Dispatch): void => {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user: IExtendedUser = JSON.parse(userData);

      dispatch(signUpSuccess(user));
    }
  };

export const logOut = () => (dispatch: Dispatch) => {
  localStorage.clear();

  dispatch({ type: UserLoginActionsEnum.LOGOUT });
};
