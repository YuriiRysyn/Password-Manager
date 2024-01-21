import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

import { useAppDispatch, useAppSelector } from '../../Store/store';
import { logout } from '../../Store/user/user.slice';
import { RequestStatusEnum } from '../../types/enums';

export const Header = () => {
  const user = useAppSelector(state => state.user);
  const { signXStatus } = user;

  const dispatch = useAppDispatch();

  let disableButtons = false;

  if (signXStatus === RequestStatusEnum.PENDING) {
    disableButtons = true;
  }

  const onLogOut = () => {
    dispatch(logout());
  };

  return (
    <header className="Header">
      <h1 className="Header__title">Password manager</h1>
      {user.isAuth ? (
        <>
          <p className="Header__user-name">{user.userData.userName}</p>
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
