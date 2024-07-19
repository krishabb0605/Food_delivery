import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';

const PrivateRoute = () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  const verified = JSON.parse(localStorage.getItem('user'))?.verified;
  const userRole = JSON.parse(localStorage.getItem('user'))?.role === 'user';

  return token && verified ? (
    userRole ? (
      <UserContextProvider>
        <Outlet />
      </UserContextProvider>
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to='/login' replace />
  );
};

export default PrivateRoute;
