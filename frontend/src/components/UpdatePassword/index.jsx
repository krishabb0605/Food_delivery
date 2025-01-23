import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { UserService } from '../../services';

const UpdatePassword = () => {
  const [data, setData] = useState({
    Password: '',
    NewPassword: '',
    ReTypePassword: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async () => {
    if (data.NewPassword.length < 8) {
      return toast.error('Passwords length must be atleast 8 characters');
    }
    if (data.NewPassword !== data.ReTypePassword) {
      return toast.error('Passwords did not match');
    }

    const dataForUpdate = {
      email: JSON.parse(localStorage.getItem('user')).email,
      password: data.NewPassword,
      oldPassword: data.Password,
    };

    setIsUpdating(true);
    try {
      const response = await UserService.resetPassword(dataForUpdate);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          Password: '',
          NewPassword: '',
          ReTypePassword: '',
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsUpdating(false);
  };

  return (
    <FormControl
      display='flex'
      flexDir='column'
      gap='40px'
      overflow='auto'
      pl='4px'
      pb={{ base: '0', sm: '30px' }}
      isRequired
    >
      <Text fontSize='24px' fontWeight='bold'>
        Update password
      </Text>

      <Flex flexDir={{ base: 'column', sm: 'row' }} gap='20px'>
        <FormLabel minW='116px'>Old Password</FormLabel>
        <Input
          p='10px'
          width={{ base: '100%', sm: 'max(40%,280px)' }}
          type='password'
          name='Password'
          id='Password'
          value={data.Password}
          placeholder='Enter your old password'
          onChange={onChangeHandler}
          borderColor='#0000004d'
          required
        />
      </Flex>

      <Flex flexDir={{ base: 'column', sm: 'row' }} gap='20px'>
        <FormLabel minW='116px'>New Password</FormLabel>
        <Input
          p='10px'
          width={{ base: '100%', sm: 'max(40%,280px)' }}
          type='password'
          name='NewPassword'
          id='NewPassword'
          value={data.NewPassword}
          placeholder='Enter your new password'
          onChange={onChangeHandler}
          borderColor='#0000004d'
          required
        />
      </Flex>

      <Flex flexDir={{ base: 'column', sm: 'row' }} gap='20px'>
        <FormLabel minW='116px'>Re-Type new Password</FormLabel>
        <Input
          p='10px'
          width={{ base: '100%', sm: 'max(40%,280px)' }}
          type='password'
          name='ReTypePassword'
          id='ReTypePassword'
          value={data.ReTypePassword}
          placeholder='Re-type new password'
          onChange={onChangeHandler}
          borderColor='#0000004d'
          required
        />
      </Flex>

      <Button
        onClick={handleSubmit}
        maxW='120px'
        minH='40px'
        colorScheme='blackAlpha'
        isLoading={isUpdating}
      >
        Update
      </Button>
    </FormControl>
  );
};

export default UpdatePassword;
