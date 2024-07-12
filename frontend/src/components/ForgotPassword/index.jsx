import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { userService } from '../../services';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    password1: '',
    password2: '',
  });

  const fetchedEmail = new URLSearchParams(location.search).get('email');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      navigate('/');
    }
  }, [localStorage.getItem('token'), localStorage.getItem('user')]);

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    const response = await userService.forgotPassword(email);
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
      email: fetchedEmail,
      password: resetPassword.password1,
    };

    const response = await userService.resetPassword(data);
    if (response.data.success) {
      toast.success(response.data.message);
      navigate('/');
    } else {
      toast.error(response.data.message);
    }
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
            <FormControl
              display='flex'
              flexDir='column'
              gap='20px'
              padding='20px'
              width='100%'
            >
              <Text fontSize='24px' fontWeight='bold'>
                Forgot password ?
              </Text>
              <Text
                alignSelf='baseline'
                fontSize='12px'
                color='#6c6c6c'
                htmlFor='email'
              >
                Email
              </Text>
              <Input
                type='email'
                placeholder='contact@gmail.com'
                name='email'
                id='email'
                value={email}
                bg='rgb(232, 240, 254)'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Flex alignItems='center' gap='8px'>
                <Button
                  onClick={() => navigate('/login')}
                  border='none'
                  borderRadius='4px'
                  colorScheme='gray'
                  fontWeight='bold'
                  cursor='pointer'
                >
                  Cancle
                </Button>
                <Button
                  border='none'
                  colorScheme='orange'
                  fontWeight='bold'
                  cursor='pointer'
                  display='flex'
                  justifyContent='center'
                  onClick={handleForgotPassword}
                  isLoading={isFetching}
                >
                  {`Confirm >`}
                </Button>
              </Flex>
            </FormControl>
          ) : (
            <FormControl
              display='flex'
              flexDir='column'
              gap='20px'
              padding='20px'
              width='100%'
            >
              <Text fontSize='24px' fontWeight='bold'>
                Reset password
              </Text>
              <Text
                alignSelf='baseline'
                fontSize='12px'
                color='#6c6c6c'
                htmlFor='password1'
              >
                New password
              </Text>
              <Input
                type='password'
                placeholder='Enter New password'
                name='password1'
                id='password1'
                bg='rgb(232, 240, 254)'
                _placeholder={{ fontSize: '14px' }}
                value={resetPassword.password1}
                onChange={(e) =>
                  setResetPassword((data) => ({
                    ...data,
                    password1: e.target.value,
                  }))
                }
                required
              />
              <Text
                alignSelf='baseline'
                fontSize='12px'
                color='#6c6c6c'
                htmlFor='password2'
              >
                Re-type new password
              </Text>
              <Input
                type='password'
                placeholder='Re-Enter new password'
                name='password2'
                id='password2'
                bg='rgb(232, 240, 254)'
                _placeholder={{ fontSize: '14px' }}
                value={resetPassword.password2}
                onChange={(e) =>
                  setResetPassword((data) => ({
                    ...data,
                    password2: e.target.value,
                  }))
                }
                required
              />
              <Button
                colorScheme='orange'
                onClick={handleResetPassword}
              >{`Change password >`}</Button>
            </FormControl>
          )}
        </Flex>
        <Image
          src={assets.background}
          alt='background_image'
          display={{ base: 'none', lg: 'unset' }}
        />
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
