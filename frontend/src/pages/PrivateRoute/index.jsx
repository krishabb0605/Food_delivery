import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { userData } = useContext(AuthContext);
  const token = userData?.token;
  const verified = userData?.verified;
  const userRole = userData?.role === 'user';

  if (!token || !verified) {
    return <Navigate to='/login' replace />;
  }

  // Admin user
  if (!userRole) {
    return <Outlet />;
  }

  // Normal user
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
};

export default PrivateRoute;
