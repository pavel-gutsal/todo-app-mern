import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { useAppSelector } from './app/hooks';
import { DashBoard } from './pages/DashBoard/DashBoard';
import { BasicLayout } from './pages/BasicLayout/BasicLayout';

export const App: React.FC = () => {
  const { status, user, error } = useAppSelector(state => state.user);

  console.log(status);
  console.log(user);
  console.log(error);

  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={user ? (<DashBoard />) : (<Navigate to="/signup" replace />)} />
        <Route path="signup" element={!user ? (<SignUp/>) : (<Navigate to="/" replace />)} />
        <Route path="login" element={!user ? (<Login />) : (<Navigate to="/" replace />)} />
      </Route>
    </Routes>
  );
}

export default App;
