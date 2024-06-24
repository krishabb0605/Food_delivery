import React, { useContext, useEffect, useState } from 'react';
import './ForgotPassword.css';
import { assets } from '../../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { url } = useContext(StoreContext);
  const [email, setEmail] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    password1: '',
    password2: '',
  });

  const email1 = new URLSearchParams(location.search).get('email');

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    const response = await axios.get(`${url}/api/user/forgotPassword/${email}`);
    if (response.data.success) {
      toast.success('Password reset email sent');
    } else {
      toast.error(response.data.message);
    }
    setIsFetching(false);
    setEmail('');
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (resetPassword.password1.length < 8) {
      toast.error('Passwords length must be atleast 8 characters');
      return;
    }
    if (resetPassword.password1 !== resetPassword.password2) {
      toast.error('Passwords did not match');
      return;
    }

    const data = {
      email: email1,
      password: resetPassword.password1,
    };

    const response = await axios.post(`${url}/api/user/resetPassword`, data);
    if (response.data.success) {
      toast.success(response.data.message);
      navigate('/');
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className='entry-page'>
      <div className='card'>
        <div className='card-header'>
          {!email1 ? (
            <form className='entry-form' onSubmit={handleForgotPassword}>
              <h2>Forgot password ?</h2>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                placeholder='contact@gmail.com'
                name='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className='btn-group'>
                <button
                  onClick={() => navigate('/login')}
                  className='light-btn'
                >
                  Cancle
                </button>
                <button className='dark-btn'>
                  {isFetching ? <div className='spinner1' /> : `Confirm >`}
                </button>
              </div>
            </form>
          ) : (
            <form className='entry-form'>
              <h2>Reset password</h2>
              <label htmlFor='password1'>New password</label>
              <input
                type='password'
                placeholder='Enter New password'
                name='password1'
                id='password1'
                value={resetPassword.password1}
                onChange={(e) =>
                  setResetPassword((data) => ({
                    ...data,
                    password1: e.target.value,
                  }))
                }
                required
              />
              <label htmlFor='password2'>Re-type new password</label>
              <input
                type='password'
                placeholder='Re-Enter new password'
                name='password2'
                id='password2'
                value={resetPassword.password2}
                onChange={(e) =>
                  setResetPassword((data) => ({
                    ...data,
                    password2: e.target.value,
                  }))
                }
                required
              />
              <button
                className='btn'
                onClick={handleResetPassword}
              >{`Change password >`}</button>
            </form>
          )}
        </div>
        <img src={assets.background} alt='background_image' />
      </div>
    </div>
  );
};

export default ForgotPassword;
