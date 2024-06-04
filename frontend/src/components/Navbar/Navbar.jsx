import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt='logo' className='logo' />
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
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;