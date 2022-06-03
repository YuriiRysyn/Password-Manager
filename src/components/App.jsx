import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUserFromLS } from '../redux/actions';

import './App.scss';
import { Dashboard } from './Dashboard/Dashboard';
import { Header } from './Header/Header';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFromLS());
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          exact
          element={
            user.isAuth ? <Dashboard /> : <Navigate to="/sign-in" replace />
          }
        ></Route>
        <Route
          path="/sign-in"
          element={!user.isAuth ? <SignIn /> : <Navigate to="/" replace />}
          exact
        ></Route>
        <Route
          path="/sign-up"
          exact
          element={!user.isAuth ? <SignUp /> : <Navigate to="/" replace />}
        ></Route>
        <Route
          path="/dashboard"
          exact
          element={
            user.isAuth ? <Dashboard /> : <Navigate to="/sign-in" replace />
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
