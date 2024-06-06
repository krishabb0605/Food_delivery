import React from 'react';
import { Navbar, Sidebar } from './components';
import { Orders, Add, List } from './pages';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stepper from './components/Stepper/Stepper';

const App = () => {
  const url = 'http://localhost:4000';
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/' element={<Stepper />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
