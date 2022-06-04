import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST } from '../../../redux/constants';
import { addItem } from '../../../redux/dashboardActions';
import { Loader } from '../../Loader/Loader';

import './AddItem.scss';

export const AddItem = () => {
  const user = useSelector(state => state.user);
  // const items = useSelector(state => state.dasboardItems.items);

  const dispatch = useDispatch();

  const [title, setTitile] = useState('');
  const [password, setPassword] = useState('');
  const requestStatus = useSelector(state => state.dasboardItems.requestStatus);
  const isPending = requestStatus === REQUEST.PENDING;

  const onAdd = () => {
    const newItemData = {
      title,
      password,
    };
    dispatch(addItem(user.id, newItemData));
    setTitile('');
    setPassword('');
  };

  return (
    <section className="AddItem">
      {isPending && (
        <div className="Authorization__loader-container">
          <Loader />
        </div>
      )}
      <h2 className="AddIteь__title">AddItem</h2>
      <form className="AddItem__form" onSubmit={onAdd} id="addItem">
        <div className="AddItem__form-item">
          <p className="AddItem__form-item-title">Service name</p>
          <input
            className="AddItem__form-input AddItem__form-input-title"
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={e => setTitile(e.target.value)}
            maxLength={20}
          />
        </div>
        <div className="AddItem__form-item">
          <p className="AddItem__form-item-password">Service password</p>

          <input
            className="AddItem__form-input AddItem__form-input-paswords"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            maxLength={20}
          />
        </div>
        <button className="AddItem__form-submit-button">Add item</button>
      </form>
    </section>
  );
};
