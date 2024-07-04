import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { StoreContext } from '../../context/StoreContext';
import { Button, Flex, Icon, Image } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

const AdminNavbar = () => {
  const { logout } = useContext(StoreContext);

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
        <Image src={assets.cooking_logo} alt='logo' w='90px' h='75px' />
        <Button onClick={logout} colorScheme='orange'>
          Logout
        </Button>
        <Icon
          width='40px'
          as={FaUser}
          alt=''
          color='#4b537b'
          transform='scale(1.3)'
        />
      </Flex>
      <Flex>
        <Sidebar />
        <Outlet />
      </Flex>
    </>
  );
};

export default AdminNavbar;
