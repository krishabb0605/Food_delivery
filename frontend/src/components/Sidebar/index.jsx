import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Icon,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { FaListUl } from 'react-icons/fa';
import { IoReceiptOutline } from 'react-icons/io5';

const Sidebar = () => {
  const navigate = useNavigate();
  const [currState, setCurrState] = useState('');
  const location = useLocation();

  const datas = [
    { icon: IoReceiptOutline, name: 'Orders', state: '/' },
    { icon: IoMdAdd, name: 'Add Items', state: '/add' },
    { icon: FaListUl, name: 'List Items', state: '/item' },
    { icon: FaListUl, name: 'List categories', state: '/category' },
  ];

  useEffect(() => {
    setCurrState(location.pathname);
  }, [location]);

  return (
    <Box
      width='18%'
      minH='calc(100vh - 100px)'
      border='1.5px solid'
      borderColor='cuisine.black.light'
      borderTop='0'
      fontSize='max(1vw,10px)'
    >
      <Flex pt='50px' pl='20%' flexDir='column' gap='20px' className='sidebar'>
        {datas.map((data) => {
          return (
            <Tooltip
              label={useBreakpointValue({
                base: data.name,
                lg: '',
              })}
              key={data.name}
              hasArrow
            >
              <Flex
                onClick={() => navigate(data.state)}
                alignItems='center'
                gap='12px'
                border='1px solid #a9a9a9'
                borderRadius='3px 0px 0px 3px'
                p='8px 10px'
                cursor='pointer'
                borderRight='0'
                className={currState === data.state ? 'active' : ''}
              >
                <Icon
                  as={data.icon}
                  alt=''
                  w='28px'
                  h='28px'
                  border='1px solid black'
                  borderRadius='4px'
                  p='4px'
                />
                <Text display={{ base: 'none', lg: 'unset' }}>{data.name}</Text>
              </Flex>
            </Tooltip>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Sidebar;
