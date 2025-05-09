import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import upload_area from '../../assets/upload_area.png';
import { AuthContext } from '../../context/AuthContext';
import VerifiedEmail from '../EntryPageModal/VerifiedEmail';
import { UserService } from '../../services';
import { toast } from 'react-toastify';

const MyDetails = () => {
  const [userData, setUserData] = useState({
    id: false,
    name: '',
    email: '',
    verified: false,
    image: false,
  });

  const [updatingData, setUpdatingData] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSendVerificationEmail,
    token,
    backendUrl,
    handleAvtar,
  } = useContext(AuthContext);

  const fetchUserData = async () => {
    try {
      const response = await UserService.getData(token);
      setUserData({
        id: response.data.user._id,
        name: response.data.user.userName,
        email: response.data.user.email,
        verified: response.data.user.verified,
        image: response.data.user.avtar
          ? `${backendUrl}/images/` + response.data.user.avtar
          : false,
      });

      handleAvtar(response.data.user.avtar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData((data) => ({ ...data, [name]: value }));
  };

  const handleItemData = async () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('userId', userData.id);
    if (typeof userData.image === 'object') {
      formData.append('image', userData.image);
    }

    setUpdatingData(true);
    try {
      const response = await UserService.userDataUpdate(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUserData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setUpdatingData(false);
  };

  return (
    <FormControl
      display='flex'
      flexDir='column'
      gap='40px'
      overflow='auto'
      pl='4px'
      pb={{ base: '22px', sm: '0' }}
      isRequired
    >
      <Text fontSize='24px' fontWeight='bold'>
        Update Personal Details
      </Text>
      <Flex gap='20px'>
        <FormLabel minW='116px'>Profile Picture</FormLabel>
        <label htmlFor='image'>
          <Image
            w='120px'
            maxH='120px'
            cursor='pointer'
            src={
              typeof userData.image === 'string'
                ? userData.image
                : userData.image
                ? URL.createObjectURL(userData.image)
                : upload_area
            }
            alt='upload-area'
          />
        </label>
        <Input
          type='file'
          id='image'
          onChange={(event) =>
            setUserData((prev) => ({ ...prev, image: event.target.files[0] }))
          }
          hidden
          required
        />
      </Flex>
      <Flex flexDir={{ base: 'column', sm: 'row' }} gap='20px'>
        <FormLabel minW='116px'>User name</FormLabel>
        <Input
          p='10px'
          width={{ base: '100%', sm: 'max(40%,280px)' }}
          type='text'
          name='name'
          id='name'
          placeholder='Type here'
          onChange={onChangeHandler}
          value={userData.name}
          borderColor='#0000004d'
          required
        />
      </Flex>
      <Flex flexDir={{ base: 'column', sm: 'row' }} gap='20px'>
        <FormLabel minW='116px'>Email Id</FormLabel>
        <Input
          p='10px'
          type='text'
          name='email'
          id='email'
          width={{ base: '100%', sm: 'max(40%,280px)' }}
          isDisabled
          placeholder='Type here'
          value={userData.email}
          color={!userData.verified ? 'red' : 'unset'}
          borderColor='#0000004d'
          required
        />
      </Flex>
      <Flex flexDir={{ base: 'column', sm: 'row' }} gap='20px' mt='-40px'>
        <Text minW='116px' ml='12px'></Text>
        {!userData.verified && (
          <FormHelperText display='flex' gap='8px'>
            <Text>Email is not verified !</Text>
            <Text
              textDecoration='underline'
              cursor='pointer'
              color='green'
              _hover={{ fontWeight: 'bold' }}
              onClick={() => {
                handleSendVerificationEmail(
                  JSON.parse(localStorage.setItem('user'))
                );
                onOpen();
              }}
            >
              Verify now
            </Text>
          </FormHelperText>
        )}
      </Flex>
      <Button
        onClick={handleItemData}
        maxW='120px'
        minH='40px'
        colorScheme='blackAlpha'
        isLoading={updatingData}
      >
        Update
      </Button>
      <VerifiedEmail onClose={onClose} isOpen={isOpen} />
    </FormControl>
  );
};

export default MyDetails;
