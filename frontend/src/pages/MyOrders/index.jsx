import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MyOrder from '../MyOrder';
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { orderService } from '../../services';
import { toast } from 'react-toastify';
import empty_order from '../../assets/empty_order.jpg';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setFetchData(true);
    try {
      const response = await orderService.usersOrder(token);

      const sortedData = response.data.data.sort((a, b) =>
        b.date.localeCompare(a.date)
      );
      setOrdersData(sortedData);
    } catch (error) {
      toast(error);
    }
    setFetchData(false);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (fetchData) {
    return (
      <Flex alignItems='center' justifyContent='center' h='40vh'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  if (!ordersData.length) {
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
        mt='85px'
        flexDir='column'
        gap='40px'
      >
        <Image src={empty_order} />
        <Button
          onClick={() => navigate('/')}
          border='none'
          colorScheme='orange'
          w='max(10vw, 180px)'
          py='12px'
          borderRadius='4px'
        >
          Place Order
        </Button>
      </Flex>
    );
  }

  return (
    <Box m='50px 0px'>
      <Text fontSize='24px' fontWeight='700'>
        My Orders
      </Text>
      <Flex flexDir='column' gap='20px' m='30px 0'>
        <Grid
          templateColumns='repeat(auto-fill, minmax(240px, 1fr))'
          mt='30px'
          gap='30px'
          rowGap='50px'
        >
          {ordersData &&
            ordersData.map((order, index) => {
              return (
                <MyOrder
                  key={index}
                  index={index}
                  order={order}
                  totalData={ordersData.length}
                  fetchOrders={fetchOrders}
                />
              );
            })}
        </Grid>
      </Flex>
    </Box>
  );
};

export default MyOrders;
