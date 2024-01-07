import { Dispatch } from 'redux';

import {
  addItemOnServer,
  deleteItemOnserver,
  getItemsFromServer,
  updateItemOnServer,
} from '../api/dashboardAPI';

import {
  DeleteItemStatusesEnum,
  ItemsActionsEnum,
  RequestStatusEnum,
} from './constants';
import { IExtendedItem, IItem } from '../types/dashboardItemsTypes';
import { IUser } from '../types/userDataTypes';

export interface IItemAction {
  type: ItemsActionsEnum;
  requestStatus: RequestStatusEnum;
}

const getItemsPending = (): IItemAction => ({
  type: ItemsActionsEnum.GET_ITEMS,
  requestStatus: RequestStatusEnum.PENDING,
});

const getItemsSuccess = (items: IExtendedItem[]) => ({
  type: ItemsActionsEnum.GET_ITEMS,
  requestStatus: RequestStatusEnum.COMPLETE,
  items,
});

export const getItems =
  (userId: IUser['id']) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(getItemsPending());

    const items = await getItemsFromServer(userId);

    if (items) {
      dispatch(getItemsSuccess(items));
    }
  };

const addItemPending = () => ({
  type: ItemsActionsEnum.ADD_ITEM_PENDING,
  requestStatus: RequestStatusEnum.PENDING,
});

const addItemError = () => ({
  type: ItemsActionsEnum.ADD_ITEM_ERROR,
  requestStatus: RequestStatusEnum.ERROR,
});

const addItemSuccess = (newItem: IExtendedItem) => ({
  type: ItemsActionsEnum.ADD_ITEM,
  requestStatus: RequestStatusEnum.COMPLETE,
  newItem,
});

export const addItem =
  (userId: IUser['id'], newItemData: IItem) => async (dispatch: Dispatch) => {
    dispatch(addItemPending());

    const createdItem = await addItemOnServer(userId, newItemData);

    if (createdItem) {
      dispatch(addItemSuccess(createdItem));
    } else {
      dispatch(addItemError());
    }
  };

export const updateItem =
  (userId: IUser['id'], itemId: IExtendedItem['id'], itemData: IExtendedItem) =>
  async (dispatch: Dispatch) => {
    const updatedItem = await updateItemOnServer(userId, itemId, itemData);

    if (updatedItem) {
      dispatch({
        type: ItemsActionsEnum.UPDATE_ITEM,
        updatedItem: updatedItem,
      });
    }
  };

export const deleteItem =
  (userId: IUser['id'], itemId: IExtendedItem['id']) =>
  async (dispatch: Dispatch) => {
    const response = await deleteItemOnserver(userId, itemId);

    if (response?.status === DeleteItemStatusesEnum.success) {
      dispatch({
        type: ItemsActionsEnum.DELETE_ITEM,
        itemId,
      });
    }
  };
