import React from 'react';
import { useSelector } from 'react-redux';
import { Item } from './Item/Item';

export const Items = () => {
  const items = useSelector(state => state.dasboardItems.items);

  return (
    <section className="Items">
      {items && items.length > 0 ? (
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
