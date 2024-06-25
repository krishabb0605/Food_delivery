import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Footer from '../Footer/Footer';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, logout } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <>
      <div className='navbar'>
        <Link to='/'>
          <img src={assets.cooking_logo} alt='logo' className='logo' />
        </Link>

        <ul className='navbar-menu'>
          <Link
            to='/'
            className={menu === 'home' ? 'active' : ''}
            onClick={() => setMenu('home')}
          >
            Home
          </Link>
          <a
            href='#explore-menu'
            className={menu === 'menu' ? 'active' : ''}
            onClick={() => setMenu('menu')}
          >
            Menu
          </a>
          <a
            href='#app-download'
            className={menu === 'mobile-app' ? 'active' : ''}
            onClick={() => setMenu('mobile-app')}
          >
            Mobile app
          </a>
          <a
            href='#footer'
            className={menu === 'contact-us' ? 'active' : ''}
            onClick={() => setMenu('contact-us')}
          >
            Contact us
          </a>
        </ul>

        <div className='navbar-right'>
          <img src={assets.search_icon} alt='seach-icon' />
          <div className='navbar-search-icon'>
            <Link to='/cart'>
              <img src={assets.basket_icon} alt='basket-icon' />
            </Link>
            <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
          </div>

          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='profile' />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt='bag' />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => navigate('/myAccount')}>
                <img src={assets.bag_icon} alt='bag' />
                <p style={{ textWrap: 'nowrap' }}>My Account</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt='logout' />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='app'>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Navbar;
