import {
  Box,
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
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import { UserContext } from '../../context/UserContext';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { WishListService } from '../../services';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { GiAbstract066 } from 'react-icons/gi';

const ListModel = ({ isOpen, onClose, handleWishListName, selectedList }) => {
  let { wishListName, setWishListName, setWishListItems } = useContext(
    UserContext
  );
  wishListName = uniq(wishListName);

  const [showMenu, setShowMenu] = useState([false, '']);
  const [renameList, setRenameList] = useState([false, false]);
  const [newName, setNewName] = useState('');
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef();

  useEffect(() => {
    setNewName(renameList[1]);
  }, [renameList]);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleRenameList();
    }
  };

  const handleRenameList = async () => {
    try {
      if (wishListName.includes(newName.toUpperCase())) {
        return toast.error('Please try something else');
      }

      const listData = {
        listName: renameList[1],
        dataToBeUpdated: { listName: newName.toUpperCase() },
      };

      //   rename in wishlist names array
      const index = wishListName.indexOf(renameList[1]);
      wishListName[index] = newName.toUpperCase();
      setWishListName(wishListName);

      //   also rename key in wishlistitem object using setWishLIstItems object fromat is like this {"key" : [],"key1" : []}

      setWishListItems((prevItems) => {
        const updatedItems = { ...prevItems };
        delete updatedItems[renameList[1]];
        updatedItems[newName.toUpperCase()] = prevItems[renameList[1]];
        return updatedItems;
      });

      if (selectedList === renameList[1]) {
        handleWishListName(newName.toUpperCase());
      }

      setIsLoading(true);
      const response = await WishListService.updateListData(listData, token);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setIsLoading(false);
      setRenameList([false, false]);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteList = async (list) => {
    try {
      setWishListName((prev) => prev.filter((listName) => listName !== list));

      onClose();
      if (selectedList === list) {
        const index = wishListName.indexOf(list);
        const nextListName = wishListName[index + 1]
          ? wishListName[index + 1]
          : wishListName[index - 1];
        handleWishListName(nextListName);
      }
      const response = await WishListService.removeList(list, token);
      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
      <DrawerOverlay />
      {!renameList[0] ? (
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' mt='40px' fontSize='30px'>
            Choose wishList
          </DrawerHeader>

          <DrawerBody>
            {wishListName &&
              wishListName.map((list, index) => {
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
                      handleWishListName(list), onClose();
                    }}
                  >
                    <Flex alignItems='center' gap='30px'>
                      <Icon
                        as={GiAbstract066}
                        color={index % 2 === 0 ? 'coral' : '#953738'}
                        w='30px'
                        h='30px'
                      />

                      <Text>{list}</Text>
                    </Flex>

                    <Flex alignItems='center' gap='12px' pos='relative'>
                      <Icon
                        as={FaHeart}
                        fill={selectedList === list ? 'red' : 'white'}
                        transform='scale(1.2)'
                        cursor='pointer'
                        style={{
                          filter:
                            'drop-shadow(rgba(0, 0, 0, 0.75) 0px 0px 12px)',
                        }}
                      />

                      <Box pos='relative' p='0px 20px' ref={ref}>
                        <Icon
                          as={CiMenuKebab}
                          onClick={(e) => {
                            e.stopPropagation(),
                              setShowMenu([!showMenu[0], list]);
                          }}
                        />

                        {showMenu[0] && showMenu[1] === list && (
                          <Flex
                            pos='absolute'
                            flexDir='column'
                            right='16px'
                            zIndex='1'
                            bg='#ffffff'
                            padding='12px 25px'
                            borderRadius='4px'
                            border='1px solid #e3dad8'
                            outline='2px solid white'
                            width='max-content'
                          >
                            <Flex
                              alignItems='center'
                              gap='10px'
                              cursor='pointer'
                              _hover={{ color: 'tomato' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setRenameList([true, list]);
                                setShowMenu([false, '']);
                              }}
                            >
                              <Icon as={MdEdit} alt='bag' color='#fc6965' />
                              <Text>Edit</Text>
                            </Flex>
                            <hr />

                            <Flex
                              alignItems='center'
                              gap='10px'
                              cursor='pointer'
                              _hover={{ color: 'tomato' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteList(list);
                                setShowMenu([false, '']);
                              }}
                            >
                              <Icon
                                as={MdDelete}
                                alt='logout'
                                color='#fc6965'
                              />
                              <Text>Remove</Text>
                            </Flex>
                          </Flex>
                        )}
                      </Box>
                    </Flex>
                  </Flex>
                );
              })}
          </DrawerBody>
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
              onClick={() => setRenameList([false, ''])}
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
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleEnter}
              />
            </FormControl>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button
              colorScheme='blackAlpha'
              w='100%'
              onClick={handleRenameList}
              isLoading={isLoading}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
  );
};

export default ListModel;
