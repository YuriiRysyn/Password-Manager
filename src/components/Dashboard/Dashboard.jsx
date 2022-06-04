import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddItem } from './AddItem/AddItem';
import { Items } from './Items/Items';

import './Dashboard.scss';
import { getItems } from '../../redux/dashboardActions';
import { REQUEST } from '../../redux/constants';
import { Loader } from '../Loader/Loader';

export const Dashboard = () => {
  const user = useSelector(state => state.user);
  const requestStatus = useSelector(state => state.dasboardItems.requestStatus);
  const isPending = requestStatus === REQUEST.PENDING;

  const dispatch = useDispatch();
  const [isShowAddItem, setIsShowAddItem] = useState(false);

  useEffect(() => {
    !isPending && dispatch(getItems(user.id));
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
