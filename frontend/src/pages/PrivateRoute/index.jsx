import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { userData } = useContext(AuthContext);
  const token = userData?.token;
  const verified = userData?.verified;
  const userRole = userData?.role === 'user';

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
