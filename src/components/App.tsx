import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
// Logic dependencies
import { useAppDispatch, useAppSelector } from '../Store/store';
import { getUserFromLS } from '../Store/user/user.actions';
import { RequestStatusEnum } from '../types/enums';
// React Components
import { Dashboard } from './Dashboard/Dashboard';
import { Header } from './Header/Header';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';

function App() {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.signXStatus === RequestStatusEnum.NOT_STARTED) {
      dispatch(getUserFromLS());
    }
  }, []);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            user.isAuth ? <Dashboard /> : <Navigate to="/sign-in" replace />
          }
        ></Route>

        <Route
          path="/sign-in"
          element={!user.isAuth ? <SignIn /> : <Navigate to="/" replace />}
        ></Route>

        <Route
          path="/sign-up"
          element={!user.isAuth ? <SignUp /> : <Navigate to="/" replace />}
        ></Route>

        <Route
          path="/dashboard"
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
