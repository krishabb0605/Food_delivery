import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Image,
  Input,
  PinInput,
  PinInputField,
  Select,
  Text,
} from '@chakra-ui/react';
import { userService } from '../../services';

const EntryPage = ({ handleRole }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({ role: 'user', email: '', password: '' });

  const [isLoginWithGoogle, setIsLoginWithGoogle] = useState(false);
  const [googleUserData, setGoogleUserData] = useState();

  const [validationToken, setValidationToken] = useState();
  const { setToken } = useContext(StoreContext);

  const [userDataForVerification, setUserDataForVerification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token) {
      if (user && user.verified === false) {
        setCurrState('verification');
      } else if (currState === 'Login') {
        localStorage.setItem('verified', true);
        navigate('/', { replace: true });
      }
    }
  }, [currState, localStorage.getItem('token'), localStorage.getItem('user')]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUserData(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    const getProfileData = async () => {
      if (googleUserData) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUserData.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${googleUserData.access_token}`,
                Accept: 'application/json',
              },
            }
          );
          console.log(response.data);
          setIsLoginWithGoogle(false);
        } catch (e) {
          alert('Error while fetching data');
        }
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

    let userRole;

    if (currState === 'Login') {
      userRole = 'login';
    } else if (currState === 'Sign Up') {
      userRole = 'register';
    }
    if (data.role === 'admin' && currState === 'Sign Up') {
      let code = prompt('Please Enter Admin Code :');
      if (code === 'admin@123') {
        handleLoginProcess(userRole);
      } else {
        toast.error('Enter valid admin code');
      }
    } else {
      handleLoginProcess(userRole);
    }
  };

  const handleLoginProcess = async (userRole) => {
    setIsFetching(true);
    const response = await userService.user(userRole, data);
    if (response.data.success) {
      setToken(response.data.token);
      handleRole(response.data.user.role);
      setUserDataForVerification(response.data.user);

      if (currState === 'Sign Up') {
        handleSendVerificationEmail(response.data.user);
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('role', response.data.user.role);
    } else {
      toast.error(response.data.message);
    }
    setIsFetching(false);
  };

  const handleSendVerificationEmail = async (userData) => {
    const data = userData ? userData : userDataForVerification;
    const response = await userService.sendVerificationEmail(data);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.success(response.data.message);
    }
  };

  const handleVerification = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    const response = await userService.verifyUser(validationToken);
    if (response.data.success) {
      localStorage.setItem('verified', true);
      navigate('/', { replace: true });
    } else {
      toast.error('Invalid OTP');
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
            <Flex
              alignItems='center'
              flexDir='column'
              justifyContent='space-between'
              w={{ base: '325px', sm: '400px' }}
            >
              <Text fontSize='24px' fontWeight='bold'>
                {currState}
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
                  {currState !== 'Login' ? (
                    <>
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
                    </>
                  ) : (
                    <></>
                  )}
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
                    value={data.password}
                    bg='rgb(232, 240, 254)'
                    required
                  />
                </Flex>
                {currState === 'Login' ? (
                  <Text
                    fontSize='12px'
                    fontWeight='bold'
                    color='tomato'
                    alignSelf='end'
                    cursor='pointer'
                    onClick={() => navigate('/forgotPassword')}
                  >
                    Forgot password ?
                  </Text>
                ) : (
                  <></>
                )}
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
                  {currState !== 'Login' ? 'Create Account' : 'Login'}
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
                  <Flex
                    display='flex'
                    alignItems='center'
                    color='#6c6c6c'
                    gap='8px'
                  >
                    <Image src={assets.goggle_icon} alt='' />
                    <Text>Sign in with google</Text>
                  </Flex>
                </Button>

                {currState !== 'Login' ? (
                  <Flex fontSize={{ base: '14px', sm: 'unset' }}>
                    Already have an account ?{' '}
                    <Text
                      onClick={() => setCurrState('Login')}
                      color='tomato'
                      fontWeight='700'
                      cursor='pointer'
                    >
                      Login here
                    </Text>
                  </Flex>
                ) : (
                  <Flex fontSize={{ base: '14px', sm: 'unset' }}>
                    Create a new account ?
                    <Text
                      onClick={() => setCurrState('Sign Up')}
                      color='tomato'
                      fontWeight='700'
                      cursor='pointer'
                    >
                      Click here
                    </Text>
                  </Flex>
                )}
              </FormControl>
            </Flex>
          ) : (
            <FormControl
              display='flex'
              alignItems='center'
              flexDir='column'
              justifyContent='center'
              width={{ base: '325px', sm: '400px' }}
              gap='20px'
            >
              <Text fontSize='24px' fontWeight='bold'>
                OTP Verification
              </Text>
              <Box
                bg='#d5efdb'
                mx='20px'
                padding='12px 24px'
                borderRadius='4px'
                color='#6d967d'
              >
                We've sent a verification code to your email -
                krishabhingaradiya1234@gmail.com
              </Box>

              <HStack justifyContent='space-evenly' w='100%' gap='0'>
                <PinInput
                  otp
                  mask
                  onChange={(e) => setValidationToken(parseInt(e))}
                  colorScheme='purple'
                >
                  <PinInputField bg='blackAlpha.10' />
                  <PinInputField bg='blackAlpha.200' />
                  <PinInputField bg='blackAlpha.300' />
                  <PinInputField bg='blackAlpha.200' />
                  <PinInputField bg='blackAlpha.100' />
                  <PinInputField bg='blackAlpha.50' />
                </PinInput>
              </HStack>
              <Text
                bg='#d5efdb'
                color='green'
                p='2px 12px'
                borderRadius='12px'
                fontWeight='bold'
                alignSelf='baseline'
                marginLeft='20px'
                cursor='pointer'
                onClick={() => handleSendVerificationEmail()}
              >{`Resend verification >`}</Text>
              <Button
                onClick={handleVerification}
                border='none'
                colorScheme='orange'
                fontWeight='bold'
                cursor='pointer'
                width='90%'
                isLoading={isFetching}
                mb='16px'
              >
                Submit
              </Button>
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

export default EntryPage;
