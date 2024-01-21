import React, { useState } from 'react';

import './AddItem.scss';
import { Loader } from '../../Loader/Loader';

// Logic dependencies
import { useAppDispatch, useAppSelector } from '../../../Store/store';
import { addItem } from '../../../Store/dashboard/dashboard.actions';

// Types
import { RequestStatusEnum } from '../../../types/enums';
import { IDashboardItems } from '../../../types/dashboardItemsTypes';

export const AddItem = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

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

    if (user.userData.id) {
      dispatch(addItem({ userId: user.userData.id, newItemData }));
    }

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
