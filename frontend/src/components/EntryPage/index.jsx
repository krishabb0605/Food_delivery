import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import google_icon from '../../assets/google.svg';
import background_mobile from '../../assets/background.webp';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
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

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
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
      const response = await userService.verifyUser(validationToken);
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
                  {currState !== 'login' && (
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
                {currState === 'login' ? (
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
                  {currState !== 'login' ? 'Create Account' : 'Login'}
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
                    <Image src={google_icon} alt='' />
                    <Text>Sign in with google</Text>
                  </Flex>
                </Button>

                {currState !== 'login' ? (
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
                ) : (
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
                {userDataForVerification.email}
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
                onClick={() =>
                  handleSendVerificationEmail(userDataForVerification)
                }
              >{`Resend verification >`}</Text>
              <Button
                onClick={handleVerificationOfToken}
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
          src={background_mobile}
          alt='background_image'
          display={{ base: 'none', lg: 'unset' }}
        />
      </Flex>
    </Flex>
  );
};

export default EntryPage;
