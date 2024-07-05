import React from 'react';

import { assets } from '../../assets/assets';
import { Flex, Grid, Icon, Image, Text } from '@chakra-ui/react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <Flex
      color='#d9d9d9'
      bg='#323232'
      flexDir='column'
      alignItems='center'
      gap='20px'
      padding='20px 8vw'
      pt='80px'
      mt='100px'
      id='footer'
    >
      <Grid
        w='100%'
        templateColumns={{ base: 'repeat(1,1fr)', sm: '2fr 1fr 1fr' }}
        gap='80px'
      >
        <Flex flexDir='column' alignItems='start' gap='20px'>
          <Image
            src={assets.cooking_logo}
            alt='logo'
            h='70px'
            w='70px'
            bg='white'
            borderRadius='50%'
          />
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
            provident velit ratione eveniet quisquam rerum fugit vero! Quis
            architecto reiciendis a labore natus id temporibus quasi debitis
            mollitia. Dignissimos fuga debitis, quae officiis odio a laudantium,
            repellendus cumque est libero, inventore aliquid ullam accusamus
            ipsum. Quae assumenda mollitia sint rerum?
          </Text>
          <Flex gap='20px'>
            <Icon as={FaFacebook} alt='facebook' w='30px' h='30px' />
            <Icon as={FaTwitter} alt='twitter' w='30px' h='30px' />
            <Icon as={FaLinkedin} alt='linkedin' w='30px' h='30px' />
          </Flex>
        </Flex>

        <Flex flexDir='column' alignItems='start' gap='20px'>
          <Text fontSize='24px' color='white'>
            COMPANY
          </Text>
          <ul>
            <Text mb='10px' cursor='pointer'>
              Home
            </Text>
            <Text mb='10px' cursor='pointer'>
              About Us
            </Text>
            <Text mb='10px' cursor='pointer'>
              Delivery
            </Text>
            <Text mb='10px' cursor='pointer'>
              Privacy policy
            </Text>
          </ul>
        </Flex>

        <Flex flexDir='column' alignItems='start' gap='20px'>
          <Text fontSize='24px' color='white'>
            GET IN TOUCH
          </Text>
          <Flex flexDir='column'>
            <Text mb='10px' cursor='pointer'>
              +1-221-454-7890
            </Text>
            <Text mb='10px' cursor='pointer'>
              contact@gmail.com
            </Text>
          </Flex>
        </Flex>
      </Grid>
      <hr />
      <Text textAlign='center'>
        Copyright 2024 © Tomato.com -All right Reserved.
      </Text>
    </Flex>
  );
};
export default Footer;
