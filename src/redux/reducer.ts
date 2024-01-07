import { AnyAction, combineReducers, Reducer } from 'redux';

import { IExtendedUser, IUser } from './../types/userDataTypes';
import { IDashboardItems } from '../types/dashboardItemsTypes';

import {
  ItemsActionsEnum,
  RequestStatusEnum,
  UserLoginActionsEnum,
} from './constants';

// interface IUserAction extends SignUpSuccessActionType,  {
//   type: UserLoginActionsEnum;
// }

// export interface Action<P> {
//   readonly type: UserLoginActionsEnum;
//   readonly payload?: P;
// }

const initialUserState: IExtendedUser = {
  userName: null,
  isAuth: false,
  id: null,
};

const userReducer: Reducer<IExtendedUser, AnyAction> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case UserLoginActionsEnum.SIGN_UP:
      return {
        ...state,
        userName: action.userName,
        isAuth: action.isAuth,
        id: action.id,
        signUpRequestStatus: action.signUpRequestStatus,
      };
    case UserLoginActionsEnum.SIGN_IN:
      return {
        ...state,
        userName: action.userName,
        isAuth: action.isAuth,
        id: action.id,
        signInRequestStatus: action.signInRequestStatus,
        error: action.error,
      };
    case UserLoginActionsEnum.LOGOUT:
      return initialUserState;
    default:
      return state;
  }
};

const initialDashboardState: IDashboardItems = {
  items: [],
  requestStatus: RequestStatusEnum.NOT_STARTED,
};

const dashboardReducer: Reducer<IDashboardItems, AnyAction> = (
  state = initialDashboardState,
  action
) => {
  switch (action.type) {
    case ItemsActionsEnum.GET_ITEMS:
      return {
        ...state,
        items: action.items,
        requestStatus: action.requestStatus,
      };
    case ItemsActionsEnum.ADD_ITEM_ERROR:
      return {
        ...state,
        requestStatus: action.requestStatus,
      };
    case ItemsActionsEnum.ADD_ITEM_PENDING:
      return {
        ...state,
        requestStatus: action.requestStatus,
      };
    case ItemsActionsEnum.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.newItem],
        requestStatus: action.requestStatus,
      };
    case ItemsActionsEnum.UPDATE_ITEM:
      return {
        ...state,
        items: [...state.items].map(item => {
          if (item.id === action.itemId) {
            return action.updatedItem;
          }

          return item;
        }),
      };
    case ItemsActionsEnum.DELETE_ITEM:
      return {
        ...state,
        items: [...state.items].filter(item => item.id !== action.itemId),
      };

    default:
      return state;
  }
};

interface IStore {
  user: IExtendedUser;
  dashboardItems: any;
}

export const reducer = combineReducers<IStore>({
  user: userReducer,
  dashboardItems: dashboardReducer,
});
