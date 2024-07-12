import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import { StoreContext } from '../../context/StoreContext';
import { FaUser } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdLogout } from 'react-icons/md';

import {
  Box,
  Flex,
  Icon,
  Image,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import { uniq } from 'lodash';

import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [showMenu, setShowMenu] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const {
    getTotalCartAmount,
    logout,
    handleCategory,
    isFetching,
    categoryData,
  } = useContext(StoreContext);

  let [menuOptions, setMenuOptions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  const ref = useRef();
  useOutsideClick({
    ref,
    handler: () => setShowMenu(false),
  });

  useEffect(() => {
    categoryData.map((menu) => setMenuOptions((prev) => [...prev, menu.name]));
    setMenuOptions((prev) => [...prev]);
  }, [isFetching]);

  useEffect(() => {
    handleCategory(searchQuery);
  }, [searchQuery]);
  menuOptions = uniq(menuOptions);

  const handleMenu = (data) => {
    if (showMenu) {
      return setShowMenu(false);
    }
    setShowMenu(data);
  };

  if (isFetching) {
    return (
      <Flex alignItems='center' justifyContent='center' h='100vh'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Box bg='white'>
      <Box bg='white' pos='sticky' top='0' zIndex='1'>
        <Flex
          className='navbar'
          p='8px 0px'
          justifyContent='space-between'
          alignItems='center'
          bg='white'
          width='90%'
          margin='auto'
        >
          <Link to='/'>
            <Image
              src={assets.cooking_logo}
              alt='logo'
              width='90px'
              height='75px'
            />
          </Link>

          <Flex
            gap='20px'
            color='#49557e'
            fontSize={{ base: '16px', lg: '18px' }}
            display={{ base: 'none', sm: 'flex' }}
          >
            <Link
              to='/'
              style={{ color: '#808080' }}
              className={menu === 'home' ? 'active' : ''}
              onClick={() => setMenu('home')}
            >
              Home
            </Link>
            <a
              href='#explore-menu'
              className={menu === 'menu' ? 'active' : ''}
              style={{ color: '#808080' }}
              onClick={() => setMenu('menu')}
            >
              Menu
            </a>
            <a
              href='#app-download'
              style={{ color: '#808080' }}
              className={menu === 'mobile-app' ? 'active' : ''}
              onClick={() => setMenu('mobile-app')}
            >
              Mobile app
            </a>
            <a
              href='#footer'
              style={{ color: '#808080' }}
              className={menu === 'contact-us' ? 'active' : ''}
              onClick={() => setMenu('contact-us')}
            >
              Contact us
            </a>
          </Flex>

          <Flex
            alignItems='center'
            gap={{ base: '16px', sm: '30px', xl: '40px' }}
          >
            {location.pathname === '/' && (
              <Icon
                as={FaSearch}
                color='#4b537b'
                alt='seach-icon'
                cursor='pointer'
                onClick={onOpen}
                transform='scale(1.3)'
              />
            )}
            <Box pos='relative'>
              <Link to='/cart'>
                <Icon
                  as={IoCart}
                  alt='basket-icon'
                  color='#4b537b'
                  transform='scale(1.5)'
                />
              </Link>
              {getTotalCartAmount() !== 0 && (
                <Box
                  pos='absolute'
                  minW='10px'
                  minH='10px'
                  bg='tomato'
                  borderRadius='50%'
                  top='-8px'
                  right='-8px'
                ></Box>
              )}
            </Box>

            <Box pos='relative' ref={ref}>
              <Icon
                as={FaUser}
                alt='profile'
                color='#4b537b'
                transform='scale(1.3)'
                cursor='pointer'
                onClick={() => handleMenu(true)}
              />
              {showMenu && (
                <Flex
                  pos='absolute'
                  flexDir='column'
                  right='0'
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
                      navigate('/myorders'), handleMenu(false);
                    }}
                    _hover={{ color: 'tomato' }}
                  >
                    <Icon as={HiOutlineShoppingBag} alt='bag' color='#fc6965' />
                    <Text>Orders</Text>
                  </Flex>
                  <hr />

                  <Flex
                    alignItems='center'
                    gap='10px'
                    cursor='pointer'
                    onClick={() => {
                      logout(), handleMenu(false);
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
        </Flex>
      </Box>

      <Box w='80%' margin='auto'>
        <Outlet />
      </Box>

      <Box>
        <Footer />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <AutoComplete rollNavigation onChange={(e) => setSearchQuery(e)}>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='inherit'
                fontSize='1.2em'
              >
                <Icon as={FaSearch} color='gray.300' />
              </InputLeftElement>
              <AutoCompleteInput
                variant='filled'
                placeholder='Search...'
                _focusVisible={{ borderColor: '#ffd5ce' }}
              />
            </InputGroup>
            <AutoCompleteList>
              {menuOptions.map((option, oid) => (
                <AutoCompleteItem
                  key={`option-${oid}`}
                  value={option}
                  textTransform='capitalize'
                  onClick={onClose}
                >
                  {option}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Navbar;
