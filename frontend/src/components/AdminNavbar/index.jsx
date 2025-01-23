import React, { useContext, useRef, useState } from 'react';
import food_logo from '../../assets/food_logo.png';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { AuthContext } from '../../context/AuthContext';
import {
  Box,
  Flex,
  Icon,
  Image,
  Text,
  useOutsideClick,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

const AdminNavbar = () => {
  const { avtar, backendUrl, handleLogout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();

  useOutsideClick({
    ref,
    handler: () => setShowMenu(false),
  });

  const handleMenu = (data) => {
    if (showMenu) {
      return setShowMenu(false);
    }
    setShowMenu(data);
  };

  return (
    <>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        p='8px 4%'
        pos='sticky'
        top='0'
        bg='white'
        borderBottom='1px solid #a9a9a9'
      >
        <Link to='/'>
          <Image src={food_logo} alt='logo' w='90px' h='75px' />
        </Link>

        <Box pos='relative' ref={ref}>
          {avtar && avtar ? (
            <Image
              src={`${backendUrl}/images/` + avtar}
              h='50px'
              w='50px'
              borderRadius='50%'
              onClick={() => handleMenu(true)}
              cursor='pointer'
            />
          ) : (
            <Icon
              width='40px'
              as={FaUser}
              alt=''
              color='#4b537b'
              transform='scale(2)'
              cursor='pointer'
              onClick={() => handleMenu(true)}
            />
          )}
          {showMenu && (
            <Flex
              pos='absolute'
              flexDir='column'
              right='0'
              top='30px'
              zIndex='1'
              bg='#fff2ed'
              padding='12px 25px'
              borderRadius='4px'
              border='1px solid tomato'
              outline='2px solid white'
              width='max-content'
            >
              <Flex
                alignItems='center'
                gap='10px'
                cursor='pointer'
                onClick={() => {
                  handleLogout(), handleMenu(false);
                }}
                _hover={{ color: 'tomato' }}
              >
                <Icon as={MdLogout} alt='logout' color='#fc6965' />
                <Text>Logout</Text>
              </Flex>
            </Flex>
          )}
        </Box>
      </Flex>
      <Flex>
        <Sidebar />
        <Outlet />
      </Flex>
    </>
  );
};

export default AdminNavbar;
