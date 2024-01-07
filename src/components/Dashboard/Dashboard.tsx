import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import { AddItem } from './AddItem/AddItem';
import { Items } from './Items/Items';

import './Dashboard.scss';
import { getItems } from '../../redux/dashboardActions';
import { Loader } from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../..';
import { RequestStatusEnum } from '../../redux/constants';
import { IDashboardItems } from '../../types/dashboardItemsTypes';

export const Dashboard = () => {
  // const user = useSelector(state => state.user);
  // const dispatch = useDispatch();

  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  // const requestStatus = useSelector(state => state.dashboardItems.requestStatus);
  const requestStatus: IDashboardItems['requestStatus'] = useAppSelector(
    state => state.dashboardItems.requestStatus
  );

  // const dashboardItems: IDashboardItems = useAppSelector(
  //   state => state.dashboardItems
  // );

  const isPending = requestStatus === RequestStatusEnum.PENDING;

  const [isShowAddItem, setIsShowAddItem] = useState(false);

  useEffect(() => {
    requestStatus === RequestStatusEnum.NOT_STARTED &&
      dispatch(getItems(user.id));
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
