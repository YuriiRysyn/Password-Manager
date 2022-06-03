const express = require('express');
const bodyParser = require('body-parser');

const { handleSignUp, handleSignIn } = require('./server/user');

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/passwords', async (req, res) => {
  // res.send( await getNotes());
});

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

app.listen(port, () => {
  console.log(`Password manager app listening at http://localhost:${port}`);
});
