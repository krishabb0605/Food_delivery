import React, { useContext, useEffect, useState } from 'react';
import background_mobile from '../../assets/background.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Flex, Image } from '@chakra-ui/react';
import { EmailService, UserService } from '../../services';
import { AuthContext } from '../../context/AuthContext';
import SendForgotEmail from './SendForgotEmail.jsx';
import ResetPassword from './ResetPassword.jsx';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    password1: '',
    password2: '',
  });
  const { token } = useContext(AuthContext);
  const fetchedEmail = new URLSearchParams(location.search).get('email');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      navigate('/');
    }
  }, [token, localStorage.getItem('user')]);

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    if (!email) {
      setIsFetching(false);
      return toast.error('Email is required');
    }

    try {
      const response = await EmailService.forgotPassword(email);
      if (response.data.success) {
        toast.success('Password reset email sent');
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setIsFetching(false);
    setEmail('');
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (resetPassword.password1.length < 8) {
      return toast.error('Passwords length must be atleast 8 characters');
    }
    if (resetPassword.password1 !== resetPassword.password2) {
      return toast.error('Passwords did not match');
    }

    const data = {
      email: fetchedEmail,
      password: resetPassword.password1,
    };
    setIsFetching(true);
    try {
      const response = await UserService.resetPassword(data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
      } else {
        toast.error(response.data.message);
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
          {!fetchedEmail ? (
            <SendForgotEmail
              setEmail={setEmail}
              email={email}
              handleForgotPassword={handleForgotPassword}
              isFetching={isFetching}
            />
          ) : (
            <ResetPassword
              resetPassword={resetPassword}
              setResetPassword={setResetPassword}
              handleResetPassword={handleResetPassword}
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

export default ForgotPassword;
