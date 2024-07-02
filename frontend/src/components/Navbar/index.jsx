import React, { useContext, useEffect, useState } from 'react';
import { assets, menu_list } from '../../assets/assets';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Footer from '../Footer';
import { StoreContext } from '../../context/StoreContext';
import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
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
  const { getTotalCartAmount, logout } = useContext(StoreContext);
  let [menuOptions, setMenuOptions] = useState([]);
  const { handleCategory } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    menu_list.map((menu) =>
      setMenuOptions((prev) => [...prev, menu.menu_name])
    );
    setMenuOptions((prev) => [...prev]);
  }, []);

  useEffect(() => {
    console.log(menuOptions);
  }, [menuOptions]);

  useEffect(() => {
    handleCategory(searchQuery);
  }, [searchQuery]);
  menuOptions = uniq(menuOptions);

  return (
    <>
      <Flex
        className='navbar'
        p='8px 0px'
        justifyContent='space-between'
        alignItems='center'
        pos='sticky'
        top='0'
        zIndex='1'
        bg='white'
        width='90%'
        margin='auto'
      >
        <Link to='/'>
          <img
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
          <Image
            src={assets.search_icon}
            alt='seach-icon'
            width={{ base: '20px', xl: 'auto' }}
            cursor='pointer'
            onClick={onOpen}
          />
          <Box pos='relative'>
            <Link to='/cart'>
              <Image
                src={assets.basket_icon}
                alt='basket-icon'
                width={{ base: '20px', xl: 'auto' }}
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

          <Box pos='relative'>
            <Image
              src={assets.profile_icon}
              alt='profile'
              width={{ base: '20px', xl: 'auto' }}
              onMouseEnter={() => setShowMenu(true)}
              // onMouseLeave={() => setShowMenu(false)}
              onClick={() => setShowMenu(true)}
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
                    navigate('/myorders'), setShowMenu(false);
                  }}
                  _hover={{ color: 'tomato' }}
                >
                  <Image src={assets.bag_icon} alt='bag' width='20px' />
                  <p>Orders</p>
                </Flex>
                <hr />

                <Flex
                  alignItems='center'
                  gap='10px'
                  cursor='pointer'
                  onClick={() => {
                    logout(), setShowMenu(false);
                  }}
                  _hover={{ color: 'tomato' }}
                >
                  <Image src={assets.logout_icon} alt='logout' width='20px' />
                  <p>Logout</p>
                </Flex>
              </Flex>
            )}
          </Box>
        </Flex>
      </Flex>

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
    </>
  );
};

export default Navbar;
