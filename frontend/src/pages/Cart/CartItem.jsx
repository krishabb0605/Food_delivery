import { Box, Flex, Grid, Icon, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { AuthContext } from '../../context/AuthContext';

const CartItem = ({ item, removeFromCart, addToCart, qty }) => {
  const { backendUrl } = useContext(AuthContext);

  return (
    <Box>
      <Grid
        templateColumns='1fr 1.5fr 1fr 2fr 1fr'
        gap='8px'
        alignItems='center'
        fontSize='max(1vw, 12px)'
        my='10px'
        color='black'
        textAlign='center'
      >
        <Image
          width='50px'
          height='40px'
          src={backendUrl + '/images/' + item.image}
          alt='item-image'
          justifySelf='center'
        />
        <Text>{item.name}</Text>
        <Text>${item.price}</Text>
        <Flex
          gap={{ base: '16px', sm: '24px' }}
          alignItems='center'
          justifySelf='center'
        >
          <Icon
            p='4px'
            alt='descrease'
            bg='#fecfd2'
            color='red'
            transform='scale(2)'
            borderRadius='50%'
            as={IoMdRemove}
            cursor='pointer'
            onClick={() => removeFromCart(item._id)}
          />
          <Text>{qty}</Text>
          <Icon
            p='4px'
            alt='increase'
            color='green'
            transform='scale(2)'
            bg='#d5ffd9'
            borderRadius='50%'
            cursor='pointer'
            as={IoMdAdd}
            onClick={() => addToCart(item._id)}
          />
        </Flex>
        <Text>${item.price * qty}</Text>
      </Grid>
      <hr />
    </Box>
  );
};

export default CartItem;
