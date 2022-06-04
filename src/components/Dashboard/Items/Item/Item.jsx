import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, updateItem } from '../../../../redux/dashboardActions';
import { EditOutlined } from '@ant-design/icons';

import './Item.scss';

export const Item = ({ item }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(item.title);
  const [password, setPassword] = useState(item.password);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const onDeleteItem = () => {
    dispatch(deleteItem(user.id, item.id));
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

      dispatch(updateItem(user.id, item.id, updatedFields));
    } else {
      onDeleteItem();
    }
    setEditItem(false);
  };

  const handleEditing = event => {
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
