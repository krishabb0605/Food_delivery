import {
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import google_icon from '../../assets/google.svg';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({
  onChangeHandler,
  data,
  handleLogin,
  isFetching,
  isLoginWithGoogle,
  setIsLoginWithGoogle,
  googleLogin,
  setCurrState,
}) => {
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };
  const navigate = useNavigate();

  return (
    <Flex
      alignItems='center'
      flexDir='column'
      justifyContent='space-between'
      w={{ base: '325px', sm: '400px' }}
    >
      <Text fontSize='24px' fontWeight='bold'>
        Login
      </Text>
      <FormControl
        display='flex'
        flexDir='column'
        gap='20px'
        padding='20px'
        width='90%'
        isRequired
      >
        <Flex
          flexDir='column'
          alignItems='center'
          justifyContent='center'
          gap='12px'
        >
          <Text alignSelf='baseline' fontSize='12px' color='#6c6c6c'>
            Email
          </Text>
          <Input
            type='email'
            placeholder='Your email'
            name='email'
            id='email'
            _placeholder={{ fontSize: '14px' }}
            onChange={onChangeHandler}
            onKeyDown={handleEnter}
            value={data.email}
            bg='rgb(232, 240, 254)'
            required
          />
          <Text
            alignSelf='baseline'
            fontSize='12px'
            color='#6c6c6c'
            htmlFor='passsword'
          >
            Password
          </Text>
          <Input
            type='password'
            _placeholder={{ fontSize: '14px' }}
            placeholder='Password'
            name='password'
            id='password'
            onChange={onChangeHandler}
            onKeyDown={handleEnter}
            value={data.password}
            bg='rgb(232, 240, 254)'
            required
          />
        </Flex>
        <Text
          fontSize='12px'
          fontWeight='bold'
          color='tomato'
          alignSelf='end'
          cursor='pointer'
          onClick={() => navigate('/forgot-password')}
        >
          Forgot password ?
        </Text>

        <Button
          onClick={handleLogin}
          border='none'
          colorScheme='orange'
          fontWeight='bold'
          cursor='pointer'
          display='flex'
          justifyContent='center'
          isLoading={isFetching}
        >
          Login
        </Button>

        <Button
          onClick={() => {
            setIsLoginWithGoogle(true), googleLogin();
          }}
          borderRadius='4px'
          borderColor='#d0d5dd'
          bg='rgb(239, 239, 239)'
          display='flex'
          justifyContent='center'
          isLoading={isLoginWithGoogle}
        >
          <Flex display='flex' alignItems='center' color='#6c6c6c' gap='8px'>
            <Image src={google_icon} alt='' />
            <Text>Sign in with google</Text>
          </Flex>
        </Button>

        <Flex fontSize={{ base: '14px', sm: 'unset' }}>
          Create a new account ?
          <Text
            onClick={() => setCurrState('register')}
            color='tomato'
            fontWeight='700'
            cursor='pointer'
          >
            Click here
          </Text>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default Login;
