import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { AdminNavbar, EntryPage, ForgotPassword, Navbar } from './components';
import {
  Add,
  Cart,
  ChefDetail,
  Home,
  List,
  MyOrders,
  Orders,
  PlaceOrder,
  PrivateRoute,
  Verify,
} from './pages';

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleRole = (role) => {
    setRole(role);
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/login' element={<EntryPage handleRole={handleRole} />} />
        <Route element={<PrivateRoute />}>
          {role === 'user' ? (
            <Route element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/order' element={<PlaceOrder />} />
              <Route path='/verify' element={<Verify />} />
              <Route path='/myorders' element={<MyOrders />} />
            </Route>
          ) : (
            <Route element={<AdminNavbar />}>
              <Route index element={<ChefDetail />} />
              <Route path='/add' element={<Add />} />
              <Route path='/list' element={<List />} />
              <Route path='/orders' element={<Orders />} />
            </Route>
          )}
        </Route>
      </Routes>
    </>
  );
};

export default App;
