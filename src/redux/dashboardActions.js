import {
  addItemOnServer,
  deleteItemOnserver,
  getItemsFromServer,
  updateItemOnServer,
} from '../api/dashboardAPI';

import {
  ADD_ITEM,
  ADD_ITEM_ERROR,
  ADD_ITEM_PENDING,
  DELETE_ITEM,
  GET_ITEMS,
  REQUEST,
  UPDATE_ITEM,
} from './constants';

const getItemsPending = () => ({
  type: GET_ITEMS,
  requestStatus: REQUEST.PENDING,
});

const getItemsSuccess = items => ({
  type: GET_ITEMS,
  requestStatus: REQUEST.COMPLETE,
  items,
});

export const getItems = userId => async dispatch => {
  dispatch(getItemsPending());

  const items = await getItemsFromServer(userId);

  dispatch(getItemsSuccess(items));
};

const addItemPending = () => ({
  type: ADD_ITEM_PENDING,
  requestStatus: REQUEST.PENDING,
});

const addItemError = () => ({
  type: ADD_ITEM_ERROR,
  requestStatus: REQUEST.ERROR,
});

const addItemSuccess = newItem => ({
  type: ADD_ITEM,
  requestStatus: REQUEST.COMPLETE,
  newItem,
});

export const addItem = (userId, newItemData) => async dispatch => {
  dispatch(addItemPending());

  const createdItem = await addItemOnServer(userId, newItemData);

  if (createdItem) {
    dispatch(addItemSuccess(createdItem));
  } else {
    dispatch(addItemError());
  }
};

export const updateItem = (userId, itemId, itemData) => async dispatch => {
  const responce = await updateItemOnServer(userId, itemId, itemData);

  if (responce && responce.status && responce.status === 'success') {
    dispatch({
      type: UPDATE_ITEM,
      updatedItem: itemData,
    });
  }
};

export const deleteItem = (userId, itemId) => async dispatch => {
  const responce = await deleteItemOnserver(userId, itemId);

  if (responce && responce.status && responce.status === 'success') {
    dispatch({
      type: DELETE_ITEM,
      itemId,
    });
  }
};
