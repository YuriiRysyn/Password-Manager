import React from 'react';

import { useAppSelector } from '../../../Store/store';

import { Item } from './Item/Item';

export const Items = () => {
  const items = useAppSelector(state => state.dashboardItems.items);

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
