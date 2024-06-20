import React, { useEffect, useContext, useState } from 'react';
import './EntryPage.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const EntryPage = ({ handleRole }) => {
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({ role: 'user', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginGoogle, setIsLoginGoogle] = useState(false);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const { url, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    const getProfileData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json',
              },
            }
          );

          setProfile(response.data);
          setIsLoginGoogle(false);
        } catch (e) {
          alert('Error while fetching data');
        }
      }
    };

    getProfileData();
  }, [user]);

  console.log({ profile });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;

    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }
    if (data.role === 'user') {
      handleLoginProcess(newUrl);
    } else {
      let code = prompt('Please Enter Admin Code :');
      if (code === 'admin@123') {
        handleLoginProcess(newUrl);
      } else {
        toast.error('Enter valid admin code');
      }
    }
  };

  const handleLoginProcess = async (newUrl) => {
    setIsLogin(true);
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      handleRole(response.data.user.role);
    } else {
      alert(response.data.message);
    }
    setIsLogin(false);
  };

  console.log(isLoginGoogle);

  return (
    <div className='entry-page'>
      <div className='card'>
        <div className='card-header'>
          <h2>{currState}</h2>
          <form onSubmit={onLogin} className='entry-form'>
            <div className='form-data'>
              {currState !== 'Login' ? (
                <select
                  name='role'
                  id='role'
                  onChange={onChangeHandler}
                  value={data.role}
                >
                  <option value='user'>User</option>
                  <option value='admin'>Admin</option>
                </select>
              ) : (
                <></>
              )}
              <input
                type='email'
                placeholder='Your email'
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                required
              />
              <input
                type='password'
                placeholder='Password'
                name='password'
                onChange={onChangeHandler}
                value={data.password}
                required
              />
            </div>
            <button type='submit' className='btn'>
              {isLogin ? (
                <div className='spinner1' style={{ margin: '1.5px 0' }}></div>
              ) : currState !== 'Login' ? (
                'Create Account'
              ) : (
                'Login'
              )}
            </button>

            <button
              onClick={() => {
                setIsLoginGoogle(true), googleLogin();
              }}
              className='btn-google'
            >
              {isLoginGoogle ? (
                <div
                  className='spinner-login'
                  style={{ margin: '1.5px 0' }}
                ></div>
              ) : (
                <div className='sign_in_google'>
                  <img src={assets.goggle_icon} alt='' />
                  <p>Sign in with google</p>
                </div>
              )}
            </button>
            <div className='condition'>
              <input type='checkbox' required />
              <p>
                By continuing, i agree to the terms of use & privacy policy.
              </p>
            </div>
            {currState !== 'Login' ? (
              <p>
                Already have an account ?{' '}
                <span onClick={() => setCurrState('Login')}>Login here</span>
              </p>
            ) : (
              <p>
                Create a new account ?
                <span onClick={() => setCurrState('Sign Up')}>Click here</span>
              </p>
            )}
          </form>
        </div>
        <img src={assets.background} alt='' />
      </div>
    </div>
  );
};

export default EntryPage;
