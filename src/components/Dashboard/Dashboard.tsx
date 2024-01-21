import React, { useEffect, useState } from 'react';

import './Dashboard.scss';

// Logic dependencies
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { getItems } from '../../Store/dashboard/dashboard.actions';
// Types
import { IDashboardItems } from '../../types/dashboardItemsTypes';
import { RequestStatusEnum } from '../../types/enums';
// React Components
import { Loader } from '../Loader/Loader';
import { AddItem } from './AddItem/AddItem';
import { Items } from './Items/Items';

export const Dashboard = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const dashboardItems: IDashboardItems = useAppSelector(
    state => state.dashboardItems
  );

  const { requestStatus } = dashboardItems;

  const isPending = requestStatus === RequestStatusEnum.PENDING;

  const [isShowAddItem, setIsShowAddItem] = useState(false);

  useEffect(() => {
    if (requestStatus === RequestStatusEnum.NOT_STARTED) {
      dispatch(getItems(user.userData.id));
    }
  }, []);

  return (
    <section className="Dashboard">
      <h1 className="Dashboard__title">Passwords dashboard</h1>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <div className="Dashboard__btn-container">
            <button
              className="Dashboard__btn"
              onClick={() => setIsShowAddItem(!isShowAddItem)}
            >
              {`${isShowAddItem ? 'Show items' : 'Add item'}`}
            </button>
          </div>

          {isShowAddItem ? <AddItem /> : <Items />}
        </>
      )}
    </section>
  );
};
