import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import background_mobile from '../../assets/background.webp';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Flex, Image } from '@chakra-ui/react';
import { UserService } from '../../services';
import VerifiedEmail from './VerifiedEmail.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

const EntryPage = () => {
  const [currState, setCurrState] = useState('login');
  const [data, setData] = useState({ role: 'user', email: '', password: '' });

  const [googleUserData, setGoogleUserData] = useState();

  const [validationToken, setValidationToken] = useState();

  const {
    handleLoginProcess,
    handleSendVerificationEmail,
    isLoginWithGoogle,
    setIsLoginWithGoogle,
    isFetching,
    setIsFetching,
  } = useContext(AuthContext);

  const userDataForVerification = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      if (user && user.verified === false) {
        setCurrState('verification');
      } else if (currState === 'login') {
        const updatedUserData = {
          ...JSON.parse(localStorage.getItem('user')),
          verified: true,
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        navigate('/', { replace: true });
      }
    }
  }, [currState, localStorage.getItem('user')]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUserData(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    const getProfileData = async () => {
      if (googleUserData) {
        handleLoginProcess('google', googleUserData.access_token);
      }
    };
    getProfileData();
  }, [googleUserData]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (data.role === 'admin' && currState === 'register') {
      let code = prompt('Please Enter Admin Code :');
      if (code === 'admin@123') {
        handleLoginProcess(currState, data);
      } else {
        toast.error('Enter valid admin code');
      }
    } else {
      handleLoginProcess(currState, data);
    }
  };

  const handleVerificationOfToken = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await UserService.verifyUser(validationToken);
      if (response.data.success) {
        const updatedUserData = {
          ...JSON.parse(localStorage.getItem('user')),
          verified: true,
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        navigate('/', { replace: true });
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error(error);
    }
    setIsFetching(false);
  };

  return (
    <Flex
      bgImage='/background.jpg'
      backgroundRepeat='no-repeat'
      h='100vh'
      w='100vw'
      backgroundSize='cover'
      overflowX='hidden'
      alignItems='center'
      justifyContent='center'
    >
      <Flex
        alignItems='center'
        justifyContent='center'
        bg='white'
        borderRadius='8px'
        overflow='auto'
        boxShadow='0 0 5px 5px white'
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          w={{ base: '325px', sm: '400px' }}
        >
          {currState !== 'verification' ? (
            currState === 'login' ? (
              <Login
                onChangeHandler={onChangeHandler}
                data={data}
                handleLogin={handleLogin}
                isFetching={isFetching}
                isLoginWithGoogle={isLoginWithGoogle}
                setIsLoginWithGoogle={setIsLoginWithGoogle}
                googleLogin={googleLogin}
                setCurrState={setCurrState}
              />
            ) : (
              <Register
                onChangeHandler={onChangeHandler}
                data={data}
                handleLogin={handleLogin}
                isFetching={isFetching}
                isLoginWithGoogle={isLoginWithGoogle}
                setIsLoginWithGoogle={setIsLoginWithGoogle}
                googleLogin={googleLogin}
                setCurrState={setCurrState}
              />
            )
          ) : (
            <VerifiedEmail
              userDataForVerification={userDataForVerification}
              setValidationToken={setValidationToken}
              handleSendVerificationEmail={handleSendVerificationEmail}
              handleVerificationOfToken={handleVerificationOfToken}
              isFetching={isFetching}
            />
          )}
        </Flex>
        <Image
          src={background_mobile}
          alt='background_image'
          display={{ base: 'none', lg: 'unset' }}
        />
      </Flex>
    </Flex>
  );
};

export default EntryPage;
