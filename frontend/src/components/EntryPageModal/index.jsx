import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import { Flex, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import Login from './Login.jsx';
import Register from './Register.jsx';

const EntryPageModal = ({ isOpen, onClose }) => {
  const [currState, setCurrState] = useState('login');
  const [data, setData] = useState({
    role: 'user',
    email: '',
    password: '',
    name: '',
  });

  const [googleUserData, setGoogleUserData] = useState();

  const { handleLoginProcess } = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUserData(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    const getProfileData = async () => {
      if (googleUserData) {
        handleLoginProcess('google', googleUserData.access_token);
        onClose();
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
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Flex
          alignItems='center'
          justifyContent='center'
          bg='white'
          borderRadius='8px'
          overflow='auto'
          boxShadow='0 0 4px 2px white'
        >
          <Flex
            alignItems='center'
            justifyContent='space-between'
            w={{ base: '325px', sm: '400px' }}
          >
            {currState === 'login' ? (
              <Login
                onChangeHandler={onChangeHandler}
                data={data}
                handleLogin={handleLogin}
                googleLogin={googleLogin}
                setCurrState={setCurrState}
              />
            ) : (
              <Register
                onChangeHandler={onChangeHandler}
                data={data}
                handleLogin={handleLogin}
                googleLogin={googleLogin}
                setCurrState={setCurrState}
              />
            )}
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default EntryPageModal;
