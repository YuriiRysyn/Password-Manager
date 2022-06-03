const { v4: uuidv4 } = require('uuid');

const users = [];

const handleSignUp = newUserData => {
  const id = uuidv4();

  const user = {
    userName: newUserData.userName,
    password: newUserData.password,
    id,
  };

  // also can add, verify and handle the case of the same name and password

  users.push(user);

  const createdUser = {
    userName: user.userName,
    id: user.id,
  };

  return createdUser;
};

const handleSignIn = userData => {
  console.log(users);
  const user = users.find(
    user =>
      user.password === userData.password && user.userName === userData.userName
  );

  if (user) {
    const createdUser = {
      userName: user.userName,
      id: user.id,
      status: 'success',
    };

    return createdUser;
  } else {
    return { status: 'Incorrect user password or name' };
  }
};

module.exports = {
  handleSignUp,
  handleSignIn,
};
