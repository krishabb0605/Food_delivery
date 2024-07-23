import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import empty_cart from '../../assets/empty_cart.png';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

const Cart = () => {
  const {
    cartItems,
    foodList,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
  } = useContext(UserContext);

  const { backendUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  if (getTotalCartAmount() === 0) {
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
        flexDir='column'
        gap='30px'
      >
        <Image src={empty_cart} h='200px' />
        <Flex flexDir='column' gap='2px' alignItems='center'>
          <Text
            color='#da6534'
            fontSize='30px'
            fontWeight='bold'
            letterSpacing='2px'
          >
            Your cart is empty
          </Text>
          <Text>{`Add something to make me happy :)`}</Text>
        </Flex>
        <Button
          onClick={() => navigate('/')}
          border='none'
          colorScheme='orange'
          w='max(15vw, 200px)'
          py='12px'
          borderRadius='4px'
        >
          Continue Ordering
        </Button>
      </Flex>
    );
  }

  return (
    <Box mt={{ base: '40px', md: '100px' }}>
      <Box>
        <Grid
          templateColumns='1fr 1.5fr 1fr 2fr 1fr '
          gap='8px'
          alignItems='center'
          color='gray'
          fontSize='max(1vw, 12px)'
          textAlign='center'
        >
          <Text>Items</Text>
          <Text>Title</Text>
          <Text>Price</Text>
          <Text>Quantity</Text>
          <Text>Total</Text>
        </Grid>
        <br />
        <hr />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <Box key={item._id}>
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
                    <Text>{cartItems[item._id]}</Text>
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
                  <Text>${item.price * cartItems[item._id]}</Text>
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
