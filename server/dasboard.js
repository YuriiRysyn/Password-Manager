const { v4: uuidv4 } = require('uuid');
const { users } = require('./user');

let items = [];

const getItems = userId => {
  const userItems = items.filter(item => item.userId === userId);

  return userItems;
};

const addItem = (userId, newItemData) => {
  const user = users.find(user => user.id === userId);

  if (user) {
    const newItem = {
      id: uuidv4(),
      userId,
      title: newItemData.title,
      password: newItemData.password,
    };

    items.push(newItem);

    return true;
  }

  return false;
};

const updateItem = (userId, itemId, itemData) => {
  const user = users.find(user => user.id === userId);
  const updatedItem = items.find(item => item.id === itemId);

  if (user && updatedItem) {
    items = items.map(item => {
      if (item.id === updatedItem.id) {
        return {
          ...item,
          ...itemData,
        };
      } else {
        return item;
      }
    });

    return true;
  }

  return false;
};

const deleteItem = (userId, itemId) => {
  const user = users.find(user => user.id === userId);

  if (user) {
    items = items.filter(item => item.id !== itemId);

    return true;
  }

  return false;
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
