import {
  ISignInUserData,
  ISignUpUserData,
  IUserDataFromServer,
} from '../types/userDataTypes';

export const signUpOnServer = async (
  userData: ISignUpUserData
): Promise<IUserDataFromServer | null> => {
  const url = process.env.REACT_APP_API_URL + '/sign-up';

  try {
    const responce = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(userData),
    });

    const user = await responce.json();

    return user;
  } catch (e) {
    console.log(e);

    return null;
  }
};

export const signInOnServer = async (
  userData: ISignInUserData
): Promise<IUserDataFromServer | null> => {
  const url = process.env.REACT_APP_API_URL + '/sign-in';

  try {
    const responce = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(userData),
    });

    const user = await responce.json();

    return user;
  } catch (e) {
    console.log(e);

    return null;
  }
};
