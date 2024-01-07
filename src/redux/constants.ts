export enum RequestStatusEnum {
  COMPLETE = 'COMPLETE',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  NOT_STARTED = 'NOT_STARTED',
}

export enum UserLoginActionsEnum {
  LOGOUT = 'LOGOUT',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
}

export enum ItemsActionsEnum {
  GET_ITEMS = 'GET_ITEMS',

  ADD_ITEM = 'ADD_ITEM',
  ADD_ITEM_PENDING = 'ADD_ITEM_PENDING',
  ADD_ITEM_ERROR = 'ADD_ITEM_ERROR',

  UPDATE_ITEM = 'UPDATE_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
}

// Delete item statuses
export enum DeleteItemStatusesEnum {
  success = 'success',
  error = 'error',
}
