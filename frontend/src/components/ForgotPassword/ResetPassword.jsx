import { Button, FormControl, Input, Text } from '@chakra-ui/react';
import React from 'react';

const ResetPassword = ({
  resetPassword,
  setResetPassword,
  handleResetPassword,
  isFetching,
}) => {
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleResetPassword(event);
    }
  };

  return (
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
        onKeyDown={(event) => handleEnter(event, 'reset')}
        required
      />
      <Button
        colorScheme='orange'
        onClick={handleResetPassword}
        isLoading={isFetching}
      >{`Change password >`}</Button>
    </FormControl>
  );
};

export default ResetPassword;
