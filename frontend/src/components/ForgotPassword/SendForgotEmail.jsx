import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SendForgotEmail = ({
  email,
  setEmail,
  handleForgotPassword,
  isFetching,
}) => {
  const navigate = useNavigate();

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleForgotPassword(event);
    }
  };

  return (
    <FormControl
      display='flex'
      flexDir='column'
      gap='20px'
      padding='20px'
      width='100%'
      isRequired
    >
      <Text fontSize='24px' fontWeight='bold'>
        Forgot password ?
      </Text>
      <FormLabel
        alignSelf='baseline'
        fontSize='12px'
        color='#6c6c6c'
        htmlFor='email'
      >
        Email
      </FormLabel>
      <Input
        type='email'
        placeholder='contact@gmail.com'
        name='email'
        id='email'
        value={email}
        bg='rgb(232, 240, 254)'
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleEnter}
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
  );
};

export default SendForgotEmail;
