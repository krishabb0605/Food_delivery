import React, { useContext, useState } from 'react';
import './EntryPage.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const EntryPage = () => {
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const { url, setToken } = useContext(StoreContext);

  const [isLogin, setIsLogin] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    setIsLogin(true);
    event.preventDefault();

    let newUrl = url;

    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      //   setShowLogin(false);
    } else {
      alert(response.data.message);
    }
    setIsLogin(false);
  };

  return (
    <div className='entry-page'>
      <div className='card'>
        <div className='card-header'>
          <h2>{currState}</h2>
          <form onSubmit={onLogin} className='entry-form'>
            <div className='form-data'>
              {currState !== 'Login' ? (
                <input
                  type='text'
                  placeholder='Your name'
                  name='name'
                  onChange={onChangeHandler}
                  value={data.name}
                  required
                />
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
            <button type='submit'>
              {isLogin ? (
                <div className='spinner1' style={{ margin: '1.5px 0' }}></div>
              ) : currState !== 'Login' ? (
                'Create Account'
              ) : (
                'Login'
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
