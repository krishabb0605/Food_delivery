import React, { useContext } from 'react';
import './AdminNavbar.css';
import { assets } from '../../assets/assets';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { StoreContext } from '../../context/StoreContext';

const AdminNavbar = () => {
  const { logout } = useContext(StoreContext);
  return (
    <>
      <div className='admin-navbar'>
        <img className='logo' src={assets.logo} alt='logo' />
        <div onClick={logout}>Logout</div>
        <img className='profile' src={assets.profile_image} alt='' />
      </div>
      <div className='app-content'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminNavbar;
