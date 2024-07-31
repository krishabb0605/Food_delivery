import React, { useContext, useEffect, useRef, useState } from 'react';
import food_logo from '../../assets/food_logo.png';
import { useNavigate, Outlet } from 'react-router-dom';
import Footer from '../Footer';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import { FaRegHeart, FaUser } from 'react-icons/fa';
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
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
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
    setFilterQuery,
    getTotalCartAmount,
    isFetching,
    foodList,
    wishListItems,
  } = useContext(UserContext);
  const { userData, handleLogout } = useContext(AuthContext);

  let [menuOptions, setMenuOptions] = useState([]);
  const navigate = useNavigate();

  let [wishListArray, setWishListArray] = useState([]);

  useEffect(() => {
    setWishListArray([]);
    for (const [key, value] of Object.entries(wishListItems)) {
      setWishListArray((prev) => [...prev, value]);
    }
  }, [wishListItems]);

  wishListArray = uniq(wishListArray).flat();

  const ref = useRef();
  useOutsideClick({
    ref,
    handler: () => setShowMenu(false),
  });

  useEffect(() => {
    foodList.map((food) => setMenuOptions((prev) => [...prev, food.name]));
    setMenuOptions((prev) => [...prev]);
  }, [isFetching]);

  useEffect(() => {
    setFilterQuery(searchQuery);
    if (searchQuery) {
      navigate('/');
    }
  }, [searchQuery]);

  menuOptions = uniq(menuOptions);

  const handleMenu = (data) => {
    if (showMenu) {
      return setShowMenu(false);
    }
    setShowMenu(data);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      onClose();
    }
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
          <Image
            src={food_logo}
            alt='logo'
            width='90px'
            height='75px'
            cursor='pointer'
            onClick={() => navigate('/')}
          />

          <Flex
            gap='20px'
            color='#49557e'
            fontSize={{ base: '16px', lg: '18px' }}
            display={{ base: 'none', sm: 'flex' }}
          >
            <Link
              href='#root'
              color='#808080'
              className={menu === 'home' ? 'active' : ''}
              _hover={{ textDecoration: 'none' }}
              onClick={() => {
                setMenu('home'), navigate('/');
              }}
            >
              Home
            </Link>
            <Link
              href='#explore-menu'
              className={menu === 'menu' ? 'active' : ''}
              _hover={{ textDecoration: 'none' }}
              color='#808080'
              onClick={() => setMenu('menu')}
            >
              Menu
            </Link>
            <Link
              href='#app-download'
              color='#808080'
              className={menu === 'mobile-app' ? 'active' : ''}
              _hover={{ textDecoration: 'none' }}
              onClick={() => setMenu('mobile-app')}
            >
              Mobile app
            </Link>
            <Link
              href='#footer'
              color='#808080'
              className={menu === 'contact-us' ? 'active' : ''}
              _hover={{ textDecoration: 'none' }}
              onClick={() => setMenu('contact-us')}
            >
              Contact us
            </Link>
          </Flex>

          <Flex
            alignItems='center'
            gap={{ base: '16px', sm: '30px', xl: '40px' }}
          >
            <Icon
              as={FaSearch}
              color='#4b537b'
              alt='seach-icon'
              cursor='pointer'
              onClick={onOpen}
              transform='scale(1.3)'
            />

            <Tooltip label='Cart'>
              <Box pos='relative'>
                <Icon
                  as={IoCart}
                  alt='basket-icon'
                  color='#4b537b'
                  transform='scale(1.5)'
                  cursor='pointer'
                  onClick={() => navigate('/cart')}
                />
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
            </Tooltip>

            <Tooltip label='WishList'>
              <Box pos='relative'>
                <Icon
                  as={FaRegHeart}
                  color='#4b537b'
                  alt='seach-icon'
                  cursor='pointer'
                  transform='scale(1.3)'
                  onClick={() => navigate('/wishlist')}
                />
                {wishListArray?.length > 0 && (
                  <Box
                    pos='absolute'
                    minW='10px'
                    minH='10px'
                    bg='tomato'
                    borderRadius='50%'
                    top='-3px'
                    right='-6px'
                  ></Box>
                )}
              </Box>
            </Tooltip>

            <Box pos='relative' ref={ref}>
              {userData && !userData.avtar ? (
                <Icon
                  as={FaUser}
                  alt='profile'
                  color='#4b537b'
                  transform='scale(1.3)'
                  cursor='pointer'
                  onClick={() => handleMenu(true)}
                />
              ) : (
                <Image
                  src={userData.avtar}
                  h='50px'
                  borderRadius='50%'
                  onClick={() => handleMenu(true)}
                  cursor='pointer'
                />
              )}
              {showMenu && (
                <Flex
                  pos='absolute'
                  flexDir='column'
                  right='0'
                  zIndex='1'
                  bg='#ffffff'
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
                _focusVisible={{ borderColor: 'inherit' }}
                onKeyDown={handleEnter}
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
