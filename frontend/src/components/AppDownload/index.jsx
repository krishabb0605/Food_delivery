import React from 'react';

import { assets } from '../../assets/assets';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const AppDownload = () => {
  return (
    <Box
      margin='auto auto'
      mt='100px'
      fontSize='max(3vw, 20px)'
      textAlign='center'
      fontWeight='600'
      id='app-download'
    >
      <Text>
        For Better Experience Download <br /> Tomato App
      </Text>
      <Flex justifyContent='center' gap='max(2vw, 10px)' mt='40px'>
        <Image
          src={assets.play_store}
          alt='app-store'
          width='max(30vw,120px)'
          maxW='180px'
          transition='0.5s'
          cursor='pointer'
          _hover={{ transform: 'scale(1.05)' }}
        />
        <Image
          src={assets.app_store}
          alt='app-store'
          width='max(30vw,120px)'
          maxW='180px'
          transition='0.5s'
          cursor='pointer'
          _hover={{ transform: 'scale(1.05)' }}
        />
      </Flex>
    </Box>
  );
};

export default AppDownload;
