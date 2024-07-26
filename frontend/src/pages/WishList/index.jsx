import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaListUl, FaRegHeart } from 'react-icons/fa';
import { MdDeleteForever, MdFileDownloadDone } from 'react-icons/md';
import WishListItem from './WishListItem.jsx';
import { toast } from 'react-toastify';
import ListModel from './ListModel.jsx';

const WishList = () => {
  const {
    wishListItems,
    foodList,
    addToCart,
    handlWishList,
    wishListName,
  } = useContext(UserContext);
  const [isMobileSize] = useMediaQuery('(max-width: 425px)');

  const [selectedList, setSelectedList] = useState(
    wishListName.length && wishListName[0]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const addAllWishListItems = () => {
    wishListItems[selectedList].forEach((itemId) => addToCart(itemId));
    toast.success('All items added to the cart', {
      position: 'bottom-right',
    });
  };

  const removeAllWishListItems = () => {
    wishListItems[selectedList].forEach((itemId) =>
      handlWishList(itemId, selectedList)
    );
  };

  const handleWishListName = (list) => {
    setSelectedList(list);
  };

  if (!wishListItems[selectedList]?.length) {
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
        flexDir='column'
        gap='60px'
      >
        {wishListName.length > 1 && (
          <Button colorScheme='cyan' onClick={onOpen} alignSelf='end'>
            <Icon as={FaListUl} me='4px' />
            Choose List
          </Button>
        )}

        <Text
          color='#da6534'
          fontSize='30px'
          fontWeight='bold'
          letterSpacing='2px'
        >
          Wish List
        </Text>

        <Flex
          alignItems='center'
          justifyContent='center'
          flexDir='column'
          gap='30px'
        >
          <Icon as={FaRegHeart} transform='scale(2.0)' color='#4b537b' />

          <Text fontWeight='500'>{`No items saved yet :)`}</Text>
          <Text
            maxW='300px'
            textAlign='center'
            fontSize='13px'
            fontWeight='400'
          >
            Use this page to curate your Flavorful cuisine Wishlist. Food items
            can be saved, removed, or added to cart for proceed to order.
          </Text>
        </Flex>

        <Button
          onClick={() => navigate('/')}
          border='none'
          colorScheme='orange'
          w='max(15vw, 200px)'
          py='12px'
          borderRadius='4px'
        >
          Continue Ordering
        </Button>
        <ListModel
          isOpen={isOpen}
          onClose={onClose}
          handleWishListName={handleWishListName}
          selectedList={selectedList}
        />
      </Flex>
    );
  }

  return (
    <>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        flexDir={{ base: 'column', lg: 'row' }}
        gap={{ base: '8px', lg: '0' }}
      >
        <Flex gap='4px' alignItems='center'>
          <Text fontWeight='500'>List Name : </Text>
          <Text fontWeight='bold' fontSize='20px'>
            {selectedList}
          </Text>
        </Flex>
        <Flex
          gap='12px'
          alignItems='center'
          justifyContent={{ base: 'space-between', lg: 'end' }}
          width={{ base: '100%', lg: 'auto ' }}
        >
          <Button colorScheme='teal' onClick={addAllWishListItems}>
            {!isMobileSize ? 'Add All items to cart' : 'Add'}
            <Icon as={MdFileDownloadDone} ms='6px' transform='scale(1.2)' />
          </Button>

          <Button colorScheme='red' onClick={removeAllWishListItems}>
            <Icon as={MdDeleteForever} me='4px' />
            {!isMobileSize ? 'Clear wishList items' : 'Clear'}
          </Button>

          {Object.keys(wishListItems).length > 1 && (
            <Button colorScheme='cyan' onClick={onOpen}>
              <Icon as={FaListUl} me='4px' />
              Choose List
            </Button>
          )}
        </Flex>
      </Flex>

      <Grid
        templateColumns='repeat(auto-fill, minmax(240px, 1fr))'
        mt='30px'
        gap='30px'
        rowGap='50px'
      >
        {foodList.map((item, index) => {
          if (wishListItems[selectedList].includes(item._id)) {
            return (
              <WishListItem
                key={index}
                item={item}
                selectedList={selectedList}
              />
            );
          }
        })}
      </Grid>
      <ListModel
        isOpen={isOpen}
        onClose={onClose}
        handleWishListName={handleWishListName}
        selectedList={selectedList}
      />
    </>
  );
};

export default WishList;
