import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addItemOnServer,
  deleteItemOnserver,
  getItemsFromServer,
  updateItemOnServer,
} from '../../api/dashboardAPI';
import { IExtendedItem, IItem } from '../../types/dashboardItemsTypes';
import { IUser } from '../../types/userDataTypes';
import { DeleteItemStatusesEnum } from '../../types/enums';

export const getItems = createAsyncThunk<
  IExtendedItem[],
  IUser['id'],
  { rejectValue: string }
>('user/getItems', async (userId, thunkApi) => {
  const items: IExtendedItem[] | null = await getItemsFromServer(userId);

  if (items) {
    return items;
  }

  return thunkApi.rejectWithValue('Error message text');
});

export const addItem = createAsyncThunk<
  IExtendedItem,
  { userId: IUser['id']; newItemData: IItem },
  { rejectValue: string }
>('user/addItem', async ({ userId, newItemData }, thunkApi) => {
  const createdItem = await addItemOnServer(userId, newItemData);

  if (createdItem) {
    return createdItem;
  }

  return thunkApi.rejectWithValue('Failed to create an item');
});

export const updateItem = createAsyncThunk<
  IExtendedItem,
  { userId: IUser['id']; itemId: IExtendedItem['id']; itemData: IItem },
  { rejectValue: string }
>('user/updateItem', async ({ userId, itemId, itemData }, thunkApi) => {
  const updatedItem = await updateItemOnServer(userId, itemId, itemData);

  if (updatedItem) {
    return updatedItem;
  }

  return thunkApi.rejectWithValue('Failed to update an item');
});

export const deleteItem = createAsyncThunk<
  { status: DeleteItemStatusesEnum; itemId: IExtendedItem['id'] },
  { userId: IUser['id']; itemId: IExtendedItem['id'] },
  { rejectValue: string }
>('user/deleteItem', async ({ userId, itemId }, thunkApi) => {
  const status = await deleteItemOnserver(userId, itemId);

  const result = {
    status: status.status,
    itemId: itemId,
  };

  if (status) {
    return result;
  }

  return thunkApi.rejectWithValue('Failed to update an item');
});
