import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, FormControl, Input, Text } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { orderService } from '../../services';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems } = useContext(
    StoreContext
  );

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    setIsLoading(true);
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    for (const [key, value] of Object.entries(data)) {
      if (value === '') {
        setIsLoading(false);
        return toast.error('Fill all details');
      }
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await orderService.placeOrder(orderData, token);

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert('Error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <FormControl
      display='flex'
      flexDir={{ base: 'column', md: 'row' }}
      alignItems='center'
      justifyContent='space-between'
      gap='50px'
      mt={{ base: '40px', md: '100px' }}
    >
      <Box w='100%' maxW='max(30%,500px)'>
        <Box fontSize='30px' fontWeight='600' mb='50px'>
          Delivery Information
        </Box>

        <Flex gap='10px'>
          <Input
            mb='15px'
            w='100%'
            p='10px'
            border='1px solid #c5c5c5'
            borderRadius='4px'
            type='text'
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder='First Name'
            required
          />
          <Input
            mb='15px'
            w='100%'
            p='10px'
            border='1px solid #c5c5c5'
            borderRadius='4px'
            type='text'
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder='Last Name'
            required
          />
        </Flex>

        <Input
          mb='15px'
          w='100%'
          p='10px'
          border='1px solid #c5c5c5'
          borderRadius='4px'
          type='email'
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          placeholder='Email Address'
          required
        />

        <Input
          mb='15px'
          w='100%'
          p='10px'
          border='1px solid #c5c5c5'
          borderRadius='4px'
          type='text'
          name='street'
          onChange={onChangeHandler}
          value={data.street}
          placeholder='Street'
          required
        />

        <Flex gap='10px'>
          <Input
            mb='15px'
            w='100%'
            p='10px'
            border='1px solid #c5c5c5'
            borderRadius='4px'
            type='text'
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            placeholder='City'
            required
          />
          <Input
            mb='15px'
            w='100%'
            p='10px'
            border='1px solid #c5c5c5'
            borderRadius='4px'
            type='text'
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            placeholder='State'
            required
          />
        </Flex>

        <Flex gap='10px'>
          <Input
            mb='15px'
            w='100%'
            p='10px'
            border='1px solid #c5c5c5'
            borderRadius='4px'
            type='text'
            name='zipcode'
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder='Zip code'
            required
          />
          <Input
            mb='15px'
            w='100%'
            p='10px'
            border='1px solid #c5c5c5'
            borderRadius='4px'
            type='text'
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            placeholder='Country'
            required
          />
        </Flex>

        <Input
          mb='15px'
          w='100%'
          p='10px'
          border='1px solid #c5c5c5'
          borderRadius='4px'
          type='text'
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          placeholder='Phone'
          required
        />
      </Box>

      <Box w='100%' maxW='max(40%,500px)'>
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
            onClick={placeOrder}
            mt='30px'
            isLoading={isLoading}
            border='none'
            colorScheme='orange'
            w='max(15vw, 200px)'
            py='12px'
            borderRadius='4px'
            cursor='pointer'
          >
            Proceed To Payment
          </Button>
        </Flex>
      </Box>
    </FormControl>
  );
};

export default PlaceOrder;
