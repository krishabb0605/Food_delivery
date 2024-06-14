import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import { EntryPage, Footer, LoginPopup } from './components';
import { MyOrders, Verify } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <ToastContainer />
      <div className={location.pathname === '/login' ? '' : 'app'}>
        {location.pathname === '/login' ? (
          ''
        ) : (
          <Navbar setShowLogin={setShowLogin} />
        )}
        <Routes>
          <Route path='/login' element={<EntryPage />} />
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      {location.pathname === '/login' ? '' : <Footer />}
    </>
  );
};

export default App;
