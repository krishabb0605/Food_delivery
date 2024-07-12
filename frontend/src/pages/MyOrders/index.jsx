import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import MyOrder from '../MyOrder';
import { Box, Flex, Grid, Spinner, Text } from '@chakra-ui/react';
import { orderService } from '../../services';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const [data, setData] = useState();
  const [fetchData, setFetchData] = useState(false);
  const { token } = useContext(StoreContext);

  const fetchOrders = async () => {
    setFetchData(true);
    try {
      const response = await orderService.usersOrder(token);

      const sortedData = response.data.data.sort((a, b) =>
        b.date.localeCompare(a.date)
      );
      setData(sortedData);
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
          {data &&
            data.map((order, index) => {
              return (
                <MyOrder
                  key={index}
                  index={index}
                  order={order}
                  totalData={data.length}
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
