import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Switch } from 'react-router-dom';

import './App.scss';
import { Dashboard } from './Dashboard/Dashboard';
import { Header } from './Header/Header';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
      <Header isAuth={isAuth} setIsAuth={setIsAuth} userData={userData} />

      <Routes>
        <Route
          path="/"
          exact
          element={isAuth ? <Dashboard /> : <Navigate to="/sign-in" replace />}
        ></Route>
        <Route
          path="/sign-in"
          element={!isAuth ? <SignIn /> : <Navigate to="/" replace />}
          exact
        ></Route>
        <Route
          path="/sign-up"
          exact
          element={!isAuth ? <SignUp /> : <Navigate to="/" replace />}
        ></Route>
        <Route
          path="/dashboard"
          exact
          element={isAuth ? <Dashboard /> : <Navigate to="/sign-in" replace />}
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
