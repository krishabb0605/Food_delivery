import {
  Box,
  Button,
  FormControl,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const VerifiedEmail = ({
  userDataForVerification,
  setValidationToken,
  handleSendVerificationEmail,
  handleVerificationOfToken,
  isFetching,
}) => {
  return (
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
        onClick={() => handleSendVerificationEmail(userDataForVerification)}
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
  );
};

export default VerifiedEmail;
