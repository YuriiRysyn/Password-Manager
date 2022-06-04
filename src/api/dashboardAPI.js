export const getItemsFromServer = async userId => {
  const url = process.env.REACT_APP_API_URL + `/dasboard/${userId}`;

  try {
    const responce = await fetch(url);

    const items = await responce.json();

    console.log(items);

    return items;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const addItemOnServer = async (userId, itemData) => {
  const url = process.env.REACT_APP_API_URL + `/dasboard/${userId}`;

  try {
    const responce = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(itemData),
    });

    const createdItem = await responce.json();

    return createdItem;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const updateItemOnServer = async (userId, itemId, itemData) => {
  const url = process.env.REACT_APP_API_URL + `/dasboard/${userId}&&${itemId}`;
  
  try {
    const responce = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(itemData),
    });

    const updatedItem = await responce.json();

    return updatedItem;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const deleteItemOnserver = async (userId, itemId) => {
  const url = process.env.REACT_APP_API_URL + `/dasboard/${userId}&&${itemId}`;

  try {
    const responce = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    const status = await responce.json();

    return status;
  } catch (e) {
    console.log(e);

    return null;
  }
};
