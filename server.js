const express = require('express');
const bodyParser = require('body-parser');

const { handleSignUp, handleSignIn } = require('./server/user');

const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} = require('./server/dasboard');

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// user API
app.post('/api/sign-up', bodyParser.json(), async (req, res) => {
  const newUserData = req.body;

  const createdUserData = handleSignUp(newUserData);

  res.send(createdUserData);
});

app.post('/api/sign-in', bodyParser.json(), async (req, res) => {
  const user = req.body;

  const signedUserData = handleSignIn(user);

  res.send(signedUserData);
});

// dasboard API
app.get('/api/dasboard/:userId', async (req, res) => {
  const items = getItems(req.params.userId);

  res.send(items);
});

app.patch(
  '/api/dasboard/:userId&&:itemId',
  bodyParser.json(),
  async (req, res) => {
    const itemData = req.body;

    console.log('PATCH', itemData);
    const result = updateItem(req.params.userId, req.params.itemId, itemData);

    if (result) {
      const items = getItems(req.params.userId);

      const updatedItem = items.find(item => item.id === req.params.itemId);

      res.send(updatedItem);
    } else {
      res.send(null);
    }

  }
);

app.post('/api/dasboard/:userId', bodyParser.json(), async (req, res) => {
  const newItem = req.body;

  const result = addItem(req.params.userId, newItem);
  console.log(result);

  if (result) {
    const items = getItems(req.params.userId);

    res.send(items[items.length - 1]);
  } else {
    res.send(null);
  }
});

app.delete('/api/dasboard/:userId&&:itemId', async (req, res) => {
  const result = deleteItem(req.params.userId, req.params.itemId);

  if (result) {
    res.send({ status: 'success' });
  } else {
    res.send({ status: 'error' });
  }
});

app.listen(port, () => {
  console.log(`Password manager app listening at http://localhost:${port}`);
});
