import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const verified = localStorage.getItem('verified');
  const userRole = localStorage.getItem('role') === 'user';

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
