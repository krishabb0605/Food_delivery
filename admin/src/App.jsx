import React from 'react';
import { Navbar, Sidebar } from './components';
import { Orders, Add, List, ChefDetail } from './pages';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // const url = 'http://localhost:4001';
  const url = 'https://food-delievery-backend.onrender.com';
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<ChefDetail url={url} />} />
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
