import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  Spinner,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { OrderService } from '../../services';
import OrderItem from './OrderItem.jsx';

const tabs = ['Food Processing', 'Out for delivery', 'Delivered'];
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await OrderService.listOrder();
      if (response.data.success) {
        const sortedData = response.data.data.sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        setOrders(sortedData);
        setIsLoading(false);
      } else {
        toast.error('Error while fetching order list');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await OrderService.updateStatus(
        orderId,
        event.target.value
      );

      if (response.data.success) {
        fetchAllOrders();
      } else {
        toast.error('Error while fetching order list');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (isLoading) {
    return (
      <Flex alignItems='center' justifyContent='center' h='40vh' w='80%'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Box
      width='76%'
      m='auto 21px'
      color='#6d6d69'
      fontSize='16px'
      height='calc(100vh - 134px)'
      overflow='auto'
      style={{ scrollbarWidth: 'thin' }}
    >
      <Tabs variant='enclosed' isFitted>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              _selected={{
                color:
                  tab === 'Food Processing'
                    ? 'tomato'
                    : tab === 'Out for delivery'
                    ? 'blue'
                    : 'green',
                borderColor: 'rgb(226, 232, 240)',
                borderBottomColor: 'white',
                fontWeight: 'bold',
              }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel
              p={4}
              key={index}
              overflow='auto'
              h='calc(100vh - 205px)'
              mt='30px'
              style={{ scrollbarWidth: 'thin' }}
            >
              {orders.map((order, index) => {
                if (order.status === tab) {
                  return (
                    <OrderItem
                      key={index}
                      order={order}
                      statusHandler={statusHandler}
                    />
                  );
                }
              })}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Orders;
