import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserService } from '../../services';
import { toast } from 'react-toastify';

const VerifiedEmail = ({ isOpen, onClose }) => {
  const { handleSendVerificationEmail } = useContext(AuthContext);
  const [validationToken, setValidationToken] = useState();
  const [isValidating, setIsValidating] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('user')));
  }, [localStorage.getItem('user')]);

  const handleVerificationOfToken = async (event) => {
    event.preventDefault();
    setIsValidating(true);
    try {
      const response = await UserService.verifyUser(validationToken);
      if (response.data.success) {
        const updatedUserData = {
          ...JSON.parse(localStorage.getItem('user')),
          verified: true,
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error(error);
    }
    setIsValidating(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent gap='12px'>
        <Flex
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
            {userData && userData.email}
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
            onClick={() => handleSendVerificationEmail(userData)}
          >{`Resend verification >`}</Text>
          <Button
            onClick={handleVerificationOfToken}
            border='none'
            colorScheme='orange'
            fontWeight='bold'
            cursor='pointer'
            width='90%'
            isLoading={isValidating}
            mb='16px'
          >
            Submit
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default VerifiedEmail;
