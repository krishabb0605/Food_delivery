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
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import { uniq } from 'lodash';
import React, { useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';

const WishListModel = ({ isOpen, onClose, listName, id }) => {
  const { handlWishList } = useContext(UserContext);
  listName = uniq(listName);

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px' mt='40px' fontSize='30px'>
          Save to your wish list
        </DrawerHeader>

        <DrawerBody>
          {listName &&
            listName.map((list) => {
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
                    fill='white'
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
          <Button colorScheme='blackAlpha' onClick={onClose} w='100%'>
            Create List
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WishListModel;
