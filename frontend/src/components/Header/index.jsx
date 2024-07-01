import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
  return (
    <Box
      id='header'
      bgImage='/header_img.png'
      backgroundRepeat='no-repeat'
      h='34vw'
      m='0 auto 30px auto'
      backgroundSize='contain'
      pos='relative'
    >
      <Flex
        flexDir='column'
        alignItems='start'
        gap='1vw'
        maxW={{ base: '65%', sm: '45%', xl: '50%' }}
        pos='absolute'
        bottom='10%'
        left='6vw'
        animation='fadeIn 2s'
      >
        <Text fontWeight='600' color='white' fontSize='max(4.5vw, 22px)'>
          Order Your favourite food here.
        </Text>
        <Text
          fontSize='1vw'
          color='white'
          display={{ base: 'none', lg: 'block' }}
        >
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </Text>
        <Button
          border='none'
          color='#747474'
          fontWeight='600'
          padding={{ base: '2vw 4vw', lg: '1vw 2.3vw' }}
          backgroundColor='white'
          fontSize={{ base: '16px', lg: 'max(1vw,30px)' }}
          borderRadius='50px'
          h='auto'
        >
          <a href='#explore-menu'> View Menu</a>
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
