import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContextProvider from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { userData } = useContext(AuthContext);
  const userRole = userData?.role === 'user';

  // Admin user
  if (userData && !userRole) {
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
