import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { AdminNavbar, FoodDetail, ForgotPassword, Navbar } from './components';
import {
  Add,
  Cart,
  CategoryList,
  Error404,
  Home,
  ItemList,
  MyOrders,
  Orders,
  PlaceOrder,
  PrivateRoute,
  Profile,
  Verify,
  WishList,
} from './pages';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { role } = useContext(AuthContext);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route element={<PrivateRoute />}>
          {role === 'admin' ? (
            <Route element={<AdminNavbar />}>
              <Route index element={<Orders />} />
              <Route path='/add' element={<Add />} />
              <Route path='/item' element={<ItemList />} />
              <Route path='/category' element={<CategoryList />} />
              <Route
                path='/profile'
                element={<Profile tabProps={{ width: '82%', mt: '20px' }} />}
              />
            </Route>
          ) : (
            <Route element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/food-detail' element={<FoodDetail />} />
              <Route path='/wishlist' element={<WishList />} />
              <Route path='/order' element={<PlaceOrder />} />
              <Route path='/verify' element={<Verify />} />
              <Route path='/myorders' element={<MyOrders />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          )}
        </Route>
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
