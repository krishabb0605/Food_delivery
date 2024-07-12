import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { FaListUl } from 'react-icons/fa';
import { IoReceiptOutline } from 'react-icons/io5';

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
          onClick={() => navigate('/')}
          alignItems='center'
          gap='12px'
          border='1px solid #a9a9a9'
          borderRadius='3px 0px 0px 3px'
          p='8px 10px'
          cursor='pointer'
          borderRight='0'
          className={currState === '/' ? 'active' : ''}
        >
          <Icon
            as={IoMdAdd}
            alt=''
            w='28px'
            h='28px'
            border='1px solid black'
            borderRadius='50%'
            p='4px'
          />
          <Text display={{ base: 'none', lg: 'unset' }}>Add Items</Text>
        </Flex>
        <Flex
          onClick={() => navigate('/item')}
          alignItems='center'
          gap='12px'
          border='1px solid #a9a9a9'
          borderRadius='3px 0px 0px 3px'
          p='8px 10px'
          cursor='pointer'
          borderRight='0'
          className={currState === '/item' ? 'active' : ''}
        >
          <Icon
            as={FaListUl}
            alt=''
            w='28px'
            h='28px'
            border='1px solid black'
            borderRadius='4px'
            p='4px'
          />
          <Text display={{ base: 'none', lg: 'unset' }}>List Items</Text>
        </Flex>
        <Flex
          onClick={() => navigate('/category')}
          alignItems='center'
          gap='12px'
          border='1px solid #a9a9a9'
          borderRadius='3px 0px 0px 3px'
          p='8px 10px'
          cursor='pointer'
          borderRight='0'
          className={currState === '/category' ? 'active' : ''}
        >
          <Icon
            as={FaListUl}
            alt=''
            w='28px'
            h='28px'
            border='1px solid black'
            borderRadius='4px'
            p='4px'
          />
          <Text display={{ base: 'none', lg: 'unset' }}>List categories</Text>
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
          <Icon
            as={IoReceiptOutline}
            alt=''
            w='28px'
            h='28px'
            border='1px solid black'
            borderRadius='4px'
            p='4px'
          />
          <Text display={{ base: 'none', lg: 'unset' }}>Orders</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
