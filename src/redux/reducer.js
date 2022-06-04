import { combineReducers } from 'redux';

import {
  SIGN_IN,
  SIGN_UP,
  LOGOUT,
  ADD_ITEM,
  GET_ITEMS,
  ADD_ITEM_PENDING,
  ADD_ITEM_ERROR,
  DELETE_ITEM,
  UPDATE_ITEM,
} from './constants';

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

const dashboardReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.items,
        requestStatus: action.requestStatus,
      };
    case ADD_ITEM_ERROR:
      return {
        ...state,
        requestStatus: action.requestStatus,
      };
    case ADD_ITEM_PENDING:
      return {
        ...state,
        requestStatus: action.requestStatus,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.newItem],
        requestStatus: action.requestStatus,
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: [...state.items].map(item => {
          if (item.id === action.itemId) {
            return action.updatedItem;
          }

          return item;
        }),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: [...state.items].filter(item => item.id !== action.itemId),
      };

    default:
      return state;
  }
};

export const reducer = combineReducers({
  user: userReducer,
  dasboardItems: dashboardReducer,
});
