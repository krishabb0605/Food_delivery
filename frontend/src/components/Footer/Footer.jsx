import React from 'react';
import './Footer.css';

import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={assets.logo} alt='logo' />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet provident velit ratione eveniet quisquam rerum fugit vero! Quis architecto reiciendis a labore natus id temporibus quasi debitis mollitia. Dignissimos fuga debitis, quae officiis odio a laudantium, repellendus cumque est libero, inventore aliquid ullam accusamus ipsum. Quae assumenda mollitia sint rerum?
          </p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt='facebook' />
            <img src={assets.twitter_icon} alt='twitter' />
            <img src={assets.linkedin_icon} alt='linkedin' />
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-221-454-7890</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
        Copyright 2024 © Tomato.com -All right Reserved.
      </p>
    </div>
  );
};
import './Footer.css';
export default Footer;
