import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

import './Item.scss';

import { useAppDispatch, useAppSelector } from '../../../../Store/store';
import {
  deleteItem,
  updateItem,
} from '../../../../Store/dashboard/dashboard.actions';

import { IExtendedItem } from '../../../../types/dashboardItemsTypes';

interface ItemProps {
  item: IExtendedItem;
}

export const Item = ({ item }: ItemProps) => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(item.title);
  const [password, setPassword] = useState(item.password);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const onDeleteItem = () => {
    dispatch(deleteItem({ userId: user.userData.id, itemId: item.id }));
  };

  const update = () => {
    if (!editItem) {
      return;
    }

    if (title && password) {
      const updatedFields = {
        title: title.trim(),
        password: password.trim(),
      };

      dispatch(
        updateItem({
          userId: user.userData.id,
          itemId: item.id,
          itemData: updatedFields,
        })
      );
    } else {
      onDeleteItem();
    }
    setEditItem(false);
  };

  const handleEditing = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!editItem) {
      return;
    }
    if (event.key === 'Enter') {
      update();
    }

    if (event.key === 'Escape') {
      setTitle(item.title);
      setPassword(item.password);

      setEditItem(false);
    }
  };

  return (
    <li className="Item">
      {!editItem && (
        <button className="Item__edit-btn" onClick={() => setEditItem(true)}>
          <EditOutlined />
        </button>
      )}

      {!editItem ? (
        <>
          <h4 className="Item__title">Service name: {title}</h4>
          <p className="Item__password" onClick={() => setIsShowPassword(true)}>
            Service password:&nbsp;
            {isShowPassword ? password : '******'}
          </p>
          <button className="Item__delete-btn" onClick={onDeleteItem} />
        </>
      ) : (
        <>
          <input
            type="text"
            className=" Item__title edit"
            value={title}
            autoFocus
            onChange={event => setTitle(event.target.value)}
            onKeyUp={handleEditing}
          />
          <input
            type="password"
            className="Item__password edit"
            value={password}
            autoFocus
            onChange={event => setPassword(event.target.value)}
            onKeyUp={handleEditing}
          />
        </>
      )}
    </li>
  );
};
