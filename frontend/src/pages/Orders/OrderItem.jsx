import { Box, Grid, Icon, Select, Text } from '@chakra-ui/react';
import React from 'react';
import { FaBox } from 'react-icons/fa';

const OrderItem = ({ order, statusHandler }) => {
  return (
    <Grid
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
                • {item.name + ' x ' + item.quantity}
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
  );
};

export default OrderItem;
