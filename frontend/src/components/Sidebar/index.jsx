import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [currState, setCurrState] = useState('');
  const location = useLocation();

  useEffect(() => {
    setCurrState(location.pathname);
  }, [location]);

  return (
    <Box
      width='18%'
      minH='calc(100vh - 100px)'
      border='1.5px solid #a9a9a9'
      borderTop='0'
      fontSize='max(1vw,10px)'
    >
      <Flex pt='50px' pl='20%' flexDir='column' gap='20px' className='sidebar'>
        <Flex
          onClick={() => navigate('/add')}
          alignItems='center'
          gap='12px'
          border='1px solid #a9a9a9'
          borderRadius='3px 0px 0px 3px'
          p='8px 10px'
          cursor='pointer'
          borderRight='0'
          className={currState === '/add' ? 'active' : ''}
        >
          <Image src={assets.add_icon} alt='' />
          <Text display={{ base: 'none', lg: 'unset' }}>Add Items</Text>
        </Flex>
        <Flex
          onClick={() => navigate('/list')}
          alignItems='center'
          gap='12px'
          border='1px solid #a9a9a9'
          borderRadius='3px 0px 0px 3px'
          p='8px 10px'
          cursor='pointer'
          borderRight='0'
          className={currState === '/list' ? 'active' : ''}
        >
          <Image src={assets.order_icon} alt='' />
          <Text display={{ base: 'none', lg: 'unset' }}>List Items</Text>
        </Flex>
        <Flex
          onClick={() => navigate('/orders')}
          alignItems='center'
          gap='12px'
          border='1px solid #a9a9a9'
          borderRadius='3px 0px 0px 3px'
          p='8px 10px'
          cursor='pointer'
          borderRight='0'
          className={currState === '/orders' ? 'active' : ''}
        >
          <Image src={assets.order_icon} alt='' />
          <Text display={{ base: 'none', lg: 'unset' }}>Orders</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
