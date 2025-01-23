import {
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Text,
  Image,
} from '@chakra-ui/react';
import google_icon from '../../assets/google.svg';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = ({
  onChangeHandler,
  data,
  handleLogin,
  googleLogin,
  setCurrState,
}) => {
  const { isLoginWithGoogle, setIsLoginWithGoogle, isFetching } = useContext(
    AuthContext
  );

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };

  return (
    <Flex
      alignItems='center'
      flexDir='column'
      justifyContent='space-between'
      w={{ base: '325px', sm: '400px' }}
    >
      <Text fontSize='24px' fontWeight='bold'>
        Register
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
          <Text
            alignSelf='baseline'
            fontSize='12px'
            color='#6c6c6c'
            htmlFor='role'
          >
            Role
          </Text>
          <Select
            name='role'
            id='role'
            onChange={onChangeHandler}
            value={data.role}
            bg='rgb(232, 240, 254)'
          >
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </Select>
          <Text alignSelf='baseline' fontSize='12px' color='#6c6c6c'>
            UserName
          </Text>
          <Input
            type='name'
            placeholder='User name'
            name='name'
            id='name'
            _placeholder={{ fontSize: '14px' }}
            onChange={onChangeHandler}
            onKeyDown={handleEnter}
            value={data.name}
            bg='rgb(232, 240, 254)'
            required
          />
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
          Create Account
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
          Already have an account ?{' '}
          <Text
            onClick={() => setCurrState('login')}
            color='tomato'
            fontWeight='700'
            cursor='pointer'
          >
            Login here
          </Text>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default Register;
