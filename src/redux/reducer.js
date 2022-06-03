import { combineReducers } from 'redux';

import { SIGN_IN, SIGN_UP, LOGOUT } from './constants';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        userName: action.userName,
        isAuth: action.isAuth,
        id: action.id,
        signUpRequestStatus: action.signUpRequestStatus,
      };
    case SIGN_IN:
      return {
        ...state,
        userName: action.userName,
        isAuth: action.isAuth,
        id: action.id,
        signInRequestStatus: action.signInRequestStatus,
        error: action.error,
      };
    case LOGOUT:
      return { userName: null, isAuth: false };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  user: userReducer,
});
