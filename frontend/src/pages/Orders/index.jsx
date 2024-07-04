import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  Grid,
  Image,
  Select,
  Spinner,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { orderService } from '../../services';
import { FaBox } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrders = async () => {
    const response = await orderService.listOrder();
    if (response.data.success) {
      const sortedData = response.data.data.sort((a, b) =>
        b.date.localeCompare(a.date)
      );
      setOrders(sortedData);
      setIsLoading(false);
    } else {
      toast.error('Error while fetching order list');
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await orderService.updateStatus(
      orderId,
      event.target.value
    );

    if (response.data.success) {
      fetchAllOrders();
    } else {
      toast.error('Error while fetching order list');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('verified')) {
      fetchAllOrders();
    }
  }, []);

  if (isLoading) {
    return (
      <Flex alignItems='center' justifyContent='center' h='40vh' w='90%'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Box
      width='76%'
      mx='auto'
      mt='50px'
      color='#6d6d69'
      fontSize='16px'
      height='calc(100vh - 145px)'
      overflow='auto'
      style={{ scrollbarWidth: 'thin' }}
    >
      <Text fontSize='20px' fontWeight='600'>
        Order Page
      </Text>
      <Box
        overflow='auto'
        h='calc(100vh - 205px)'
        mt='30px'
        style={{ scrollbarWidth: 'thin' }}
      >
        {orders.map((order, index) => (
          <Grid
            key={index}
            templateColumns={{
              base: '0.5fr 2fr 1fr',
              lg: '0.5fr 2fr 1fr 1fr 1fr',
            }}
            alignItems='center'
            gap='30px'
            border='1px solid tomato'
            p={{ base: '15px 8px', lg: '20px' }}
            mb='30px'
            fontSize={{ base: '14px', lg: '12px' }}
            color='#505050'
          >
            <Icon
              as={FaBox}
              color='#fc9535'
              w={{ base: '40px', lg: '50px' }}
              h={{ base: '40px', lg: '50px' }}
              alt='icon'
            />
            <Box>
              <Box fontWeight='600'>
                {order.items.map((item, index) => {
                  return (
                    <Text fontSize={{ base: 'xs', lg: 'sm' }} key={index}>
                      • {(item.name += ' x ' + item.quantity)}
                    </Text>
                  );
                })}
              </Box>
              <Text fontWeight='600' mt='30px' mb='5px'>
                {order.address.firstName + ' ' + order.address.lastName}
              </Text>
              <Box mb='10px'>
                <Text>{order.address.street + ','}</Text>
                <Text>
                  {order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.country +
                    ', ' +
                    order.address.zipcode}
                </Text>
              </Box>
              <Text>{order.address.phone}</Text>
            </Box>
            <Text>Items : {order.items.length}</Text>
            <Text fontWeight='700'>${order.amount}</Text>
            <Select
              bg='#ffe8e4'
              border='1px solid tomato'
              width='max(10vw,120px)'
              fontSize={{ base: '12px', lg: 'unset' }}
              outline='none'
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value='Food Processing'>Food Processing</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </Select>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default Orders;
