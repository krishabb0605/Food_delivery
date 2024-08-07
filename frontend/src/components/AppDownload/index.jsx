import React from 'react';

import play_store from '../../assets/play_store.png';
import app_store from '../../assets/app_store.png';
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
        For Better Experience Download <br /> Flavorful cuisine App
      </Text>
      <Flex justifyContent='center' gap='max(2vw, 10px)' mt='40px'>
        <Image
          src={play_store}
          alt='app-store'
          width='max(30vw,120px)'
          maxW='180px'
          transition='0.5s'
          cursor='pointer'
          _hover={{ transform: 'scale(1.05)' }}
        />
        <Image
          src={app_store}
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
