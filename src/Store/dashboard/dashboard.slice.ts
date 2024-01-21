import { createSlice } from '@reduxjs/toolkit';

import { addItem, deleteItem, getItems, updateItem } from './dashboard.actions';

import { IDashboardItems } from '../../types/dashboardItemsTypes';
import { RequestStatusEnum } from '../../types/enums';

const initialDashboardState: IDashboardItems = {
  items: [],
  requestStatus: RequestStatusEnum.NOT_STARTED,
  error: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialDashboardState,
  reducers: {},
  extraReducers: builder => {
    //#region --- Get item ---
    builder.addCase(getItems.pending, state => {
      state.requestStatus = RequestStatusEnum.PENDING;
    });

    builder.addCase(getItems.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatusEnum.COMPLETE;
      state.items = payload;
    });

    builder.addCase(getItems.rejected, (state, { payload }) => {
      state.requestStatus = RequestStatusEnum.ERROR;
      state.error = payload;
    });
    //#endregion

    //#region --- Add item ---
    builder.addCase(addItem.pending, state => {
      state.requestStatus = RequestStatusEnum.PENDING;
      state.error = null;
    });

    builder.addCase(addItem.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatusEnum.COMPLETE;

      state.items.push(payload);
    });

    builder.addCase(addItem.rejected, (state, { payload }) => {
      state.requestStatus = RequestStatusEnum.ERROR;
      state.error = payload;
    });
    //#endregion

    //#region --- Update item ---
    builder.addCase(updateItem.pending, state => {
      state.error = null;

      state.requestStatus = RequestStatusEnum.PENDING;
    });

    builder.addCase(updateItem.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatusEnum.COMPLETE;

      state.items = state.items.map(item => {
        if (item.id === payload.id) {
          return payload;
        }

        return item;
      });
    });

    builder.addCase(updateItem.rejected, (state, { payload }) => {
      state.requestStatus = RequestStatusEnum.ERROR;
      state.error = payload;
    });
    //#endregion

    //#region --- Delete item ---
    builder.addCase(deleteItem.pending, state => {
      state.error = null;

      state.requestStatus = RequestStatusEnum.PENDING;
    });

    builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
      state.requestStatus = RequestStatusEnum.COMPLETE;

      state.items = state.items.filter(item => item.id !== payload.itemId);
    });

    builder.addCase(deleteItem.rejected, (state, { payload }) => {
      state.requestStatus = RequestStatusEnum.ERROR;
      state.error = payload;
    });
    //#endregion
  },
});

// export const {   } = dashboardSlice.actions;

export default dashboardSlice.reducer;
