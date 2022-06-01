import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './Header.scss';

export const Header = ({ isAuth, setIsAuth, userData }) => {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <header className="Header">
      <h1 className="Header__title">Password manager</h1>
      {isAuth ? (
        <>
          <span className="Header__title">{userData.userName}</span>
          <button
            className="Header__log-out-btn"
            onClick={() => setIsAuth(false)}
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <NavLink to="/sign-in">
            <button className="Header__btn">Sign In</button>
          </NavLink>
          <NavLink to="/sign-up">
            <button className="Header__btn">Sign Up</button>
          </NavLink>
        </>
      )}
    </header>
  );
};
