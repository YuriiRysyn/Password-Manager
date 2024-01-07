import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { RequestStatusEnum } from '../../../redux/constants';
import { addItem } from '../../../redux/dashboardActions';
import { Loader } from '../../Loader/Loader';

import './AddItem.scss';
import { useAppDispatch, useAppSelector } from '../../..';
import { IDashboardItems } from '../../../types/dashboardItemsTypes';

export const AddItem = () => {
  // const user = useSelector(state => state.user);
  // const dispatch = useDispatch();

  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  // const requestStatus = useSelector(state => state.dashboardItems.requestStatus);
  const requestStatus: IDashboardItems['requestStatus'] = useAppSelector(
    state => state.dashboardItems.requestStatus
  );

  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  const isPending =
    requestStatus === RequestStatusEnum.PENDING ||
    requestStatus === RequestStatusEnum.NOT_STARTED;

  const onAdd = () => {
    const newItemData = {
      title,
      password,
    };

    dispatch(addItem(user.id, newItemData));

    setTitle('');
    setPassword('');
  };

  return (
    <section className="AddItem">
      {isPending && (
        <div className="Authorization__loader-container">
          <Loader />
        </div>
      )}
      <h2 className="AddItem__title">AddItem</h2>
      <form className="AddItem__form" onSubmit={onAdd} id="addItem">
        <div className="AddItem__form-item">
          <p className="AddItem__form-item-title">Service name</p>
          <input
            className="AddItem__form-input AddItem__form-input-title"
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
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
