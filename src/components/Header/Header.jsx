import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../redux/actions';
import { REQUEST } from '../../redux/constants';

import './Header.scss';

export const Header = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  let disableButtons = false;

  if (user) {
    if (
      user.signInRequestStatus &&
      user.signInRequestStatus === REQUEST.PENDING
    ) {
      disableButtons = true;
    } else if (
      user.signUpRequestStatus &&
      user.signUpRequestStatus === REQUEST.PENDING
    ) {
      disableButtons = true;
    }
  }

  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className="Header">
      <h1 className="Header__title">Password manager</h1>
      {user.isAuth ? (
        <>
          <p className="Header__user-name">{user.userName}</p>
          <button className="Header__btn" onClick={onLogOut}>
            Log Out
          </button>
        </>
      ) : disableButtons ? (
        <>
          <span className="Header__btn Header__btn--disabled">Sign In</span>{' '}
          <span className="Header__btn Header__btn--disabled">Sign Up</span>{' '}
        </>
      ) : (
        <>
          <NavLink to="/sign-in" className="Header__btn">
            Sign In
          </NavLink>
          <NavLink to="/sign-up" className="Header__btn">
            Sign Up
          </NavLink>
        </>
      )}
    </header>
  );
};
