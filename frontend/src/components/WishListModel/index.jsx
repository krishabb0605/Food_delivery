import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { uniq } from 'lodash';
import React, { useContext, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';

const WishListModel = ({ isOpen, onClose, id }) => {
  let { handlWishList, wishListName, wishListItems } = useContext(UserContext);

  const [isCreateList, setIsCreateList] = useState(false);

  const [createListName, setCreateListName] = useState('');

  wishListName = uniq(wishListName);

  const handleNewList = () => {
    if (!createListName) {
      return toast.error('List name is required', {
        position: 'top-center',
      });
    }

    if (wishListName.includes(createListName.toUpperCase())) {
      return toast.error('List name is already exist !!', {
        position: 'top-center',
      });
    }

    handlWishList(id, createListName.toUpperCase());
    setCreateListName('');
    setIsCreateList(false);
    onClose();
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleNewList(event);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
      <DrawerOverlay />
      {!isCreateList ? (
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' mt='40px' fontSize='30px'>
            Save to your wish list
          </DrawerHeader>

          <DrawerBody>
            {wishListName &&
              wishListName.map((list) => {
                return (
                  <Flex
                    cursor='pointer'
                    key={list}
                    spacing={4}
                    borderBottomWidth='1px'
                    py='20px'
                    gap='12px'
                    alignItems='center'
                    justifyContent='space-between'
                    onClick={() => {
                      handlWishList(id, list), onClose();
                    }}
                  >
                    <Flex alignItems='center' gap='30px'>
                      <Image
                        src='https://picsum.photos/200/200'
                        w='40px'
                        h='40px'
                      />
                      <Text>{list}</Text>
                    </Flex>
                    <Icon
                      as={FaHeart}
                      fill={wishListItems[list]?.includes(id) ? 'red' : 'white'}
                      transform='scale(1.2)'
                      cursor='pointer'
                      _hover={{ fill: 'red' }}
                      style={{
                        filter: 'drop-shadow(rgba(0, 0, 0, 0.75) 0px 0px 12px)',
                      }}
                    />
                  </Flex>
                );
              })}
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button
              colorScheme='blackAlpha'
              onClick={() => setIsCreateList(true)}
              w='100%'
            >
              Create List
            </Button>
          </DrawerFooter>
        </DrawerContent>
      ) : (
        <DrawerContent>
          <Flex>
            <Icon
              as={IoMdArrowRoundBack}
              transform='scale(1.3)'
              ml='16px'
              mt='24px'
              cursor='pointer'
              onClick={() => setIsCreateList(!isCreateList)}
            />
            <DrawerCloseButton />
          </Flex>
          <DrawerHeader borderBottomWidth='1px' mt='40px' fontSize='30px'>
            Give your list a name
          </DrawerHeader>

          <DrawerBody>
            <FormControl mt='16px' isRequired>
              <FormLabel color='#6d6d69'>Enter a list name</FormLabel>
              <Input
                value={createListName}
                onChange={(e) => setCreateListName(e.target.value)}
                onKeyDown={handleEnter}
              />
            </FormControl>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button colorScheme='blackAlpha' onClick={handleNewList} w='100%'>
              Create List
            </Button>
          </DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
  );
};

export default WishListModel;
