import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { StoreContext } from '../../context/StoreContext';
import { Button, Flex, Image } from '@chakra-ui/react';

const AdminNavbar = () => {
  const { logout } = useContext(StoreContext);

  const navigate = useNavigate();
  useEffect(() => {
    navigate('/add');
  }, []);
  
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
        <Image width='max(10%,80px)' src={assets.logoAdmin} alt='logo' />
        <Button onClick={logout} colorScheme='orange'>
          Logout
        </Button>
        <Image width='40px' src={assets.profile_image} alt='' />
      </Flex>
      <Flex>
        <Sidebar />
        <Outlet />
      </Flex>
    </>
  );
};

export default AdminNavbar;
