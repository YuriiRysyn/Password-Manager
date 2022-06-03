import { signUpOnServer, signInOnServer } from '../api/authorization';

import { SIGN_IN, SIGN_UP, LOGOUT, REQUEST } from './constants';

// Sign Up actions
const signUpPending = () => ({
  type: SIGN_UP,
  signUpRequestStatus: REQUEST.PENDING,
});

const signUpError = () => ({
  type: SIGN_UP,
  signUpRequestStatus: REQUEST.ERROR,
});

const signUpSuccess = userData => ({
  type: SIGN_UP,
  signUpRequestStatus: REQUEST.COMPLETE,
  isAuth: true,
  ...userData,
});

export const signUp = userData => async dispatch => {
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
const signInPending = () => ({
  type: SIGN_IN,
  signInRequestStatus: REQUEST.PENDING,
});

const signInError = error => ({
  error,
  type: SIGN_IN,
  signInRequestStatus: REQUEST.ERROR,
});

const signInSuccess = userData => ({
  type: SIGN_IN,
  signInRequestStatus: REQUEST.COMPLETE,
  isAuth: true,
  ...userData,
});

export const signIn = userData => async dispatch => {
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

export const getUserFromLS = () => dispatch => {
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));

    dispatch(signUpSuccess(user));
  }
};

export const logOut = () => dispatch => {
  localStorage.clear();

  dispatch({ type: LOGOUT });
};
