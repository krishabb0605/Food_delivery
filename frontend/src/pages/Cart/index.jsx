import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Grid, Image, Input, Text } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
  const {
    cartItems,
    foodList,
    removeFromCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <Box mt={{ base: '40px', md: '100px' }}>
      <Box>
        <Grid
          templateColumns='1fr 1.5fr 1fr 1fr 1fr 0.5fr'
          gap='8px'
          alignItems='center'
          color='gray'
          fontSize='max(1vw, 12px)'
        >
          <Text>Items</Text>
          <Text>Title</Text>
          <Text>Price</Text>
          <Text>Quantity</Text>
          <Text>Total</Text>
          <Text justifySelf='center'>Remove</Text>
        </Grid>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <Box key={item._id}>
                <Grid
                  templateColumns='1fr 1.5fr 1fr 1fr 1fr 0.5fr'
                  gap='8px'
                  alignItems='center'
                  fontSize='max(1vw, 12px)'
                  my='10px'
                  color='black'
                >
                  <Image
                    width='50px'
                    height='40px'
                    src={url + '/images/' + item.image}
                    alt='item-image'
                  />
                  <Text>{item.name}</Text>
                  <Text>${item.price}</Text>
                  <Text>{cartItems[item._id]}</Text>
                  <Text>${item.price * cartItems[item._id]}</Text>
                  <Text
                    onClick={() => removeFromCart(item._id)}
                    justifySelf='center'
                    cursor='pointer'
                  >
                    <MdDelete />
                  </Text>
                </Grid>
                <hr />
              </Box>
            );
          }
        })}
      </Box>
      <Flex
        justifyContent='space-between'
        flexDir={{ base: 'column-reverse', md: 'row' }}
        gap='max(10vw,20px)'
        mt='80px'
      >
        <Flex flex='1' flexDir='column' gap='20px'>
          <Text fontSize='24px' fontWeight='700'>
            Cart Total
          </Text>
          <Box>
            <Flex justifyContent='space-between' color='#444'>
              <Text>Subtotal</Text>
              <Text>${getTotalCartAmount()}</Text>
            </Flex>
            <hr />
            <Flex justifyContent='space-between' color='#444'>
              <Text>Delivary Fee</Text>
              <Text>${getTotalCartAmount() === 0 ? 0 : 2}</Text>
            </Flex>
            <hr />
            <Flex justifyContent='space-between' color='#444'>
              <Text fontWeight='bold'>Total</Text>
              <Text fontWeight='bold'>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </Text>
            </Flex>
          </Box>
          <Button
            onClick={() => navigate('/order')}
            border='none'
            colorScheme='orange'
            w='max(15vw, 200px)'
            py='12px'
            borderRadius='4px'
            cursor='pointer'
          >
            Proceed To Checkout
          </Button>
        </Flex>

        <Box flex='1'>
          <Box>
            <Text color='#555'>If you have a promo code , Enter it here</Text>
            <Flex
              mt='10px'
              justifyContent='space-between'
              alignItems='center'
              bg='#e1e1e1'
              borderRadius='4px'
            >
              <Input
                bg='transparent'
                border='none'
                outline='none'
                pl='10px'
                type='text'
                placeholder='Promo code'
              />
              <Button
                w='max(10vw,150px)'
                p='12px 5px'
                bg='black'
                border='none'
                color='white'
                borderRadius='4px'
              >
                Submit
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Cart;
