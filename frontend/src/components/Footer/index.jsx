import React from 'react';

import { assets } from '../../assets/assets';
import { Flex, Grid, Image, Text } from '@chakra-ui/react';

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
          <Image src={assets.logo} alt='logo' />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
            provident velit ratione eveniet quisquam rerum fugit vero! Quis
            architecto reiciendis a labore natus id temporibus quasi debitis
            mollitia. Dignissimos fuga debitis, quae officiis odio a laudantium,
            repellendus cumque est libero, inventore aliquid ullam accusamus
            ipsum. Quae assumenda mollitia sint rerum?
          </p>
          <Flex>
            <Image
              src={assets.facebook_icon}
              alt='facebook'
              width='40px'
              mr='15px'
            />
            <Image
              src={assets.twitter_icon}
              alt='twitter'
              width='40px'
              mr='15px'
            />
            <Image
              src={assets.linkedin_icon}
              alt='linkedin'
              width='40px'
              mr='15px'
            />
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
