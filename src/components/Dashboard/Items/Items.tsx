import React from 'react';
// import { useSelector } from 'react-redux';
import { Item } from './Item/Item';
import { useAppSelector } from '../../..';
import { IDashboardItems } from '../../../types/dashboardItemsTypes';

export const Items = () => {
  // const items = useSelector(state => state.dashboardItems.items);
  const items: IDashboardItems['items'] = useAppSelector(
    state => state.dashboardItems.items
  );

  return (
    <section className="Items">
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <h3>There is no items. Click add item button to add.</h3>
      )}
    </section>
  );
};
