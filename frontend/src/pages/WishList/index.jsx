import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Button, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { MdDeleteForever, MdFileDownloadDone } from 'react-icons/md';
import WishListItem from './WishListItem.jsx';
import { toast } from 'react-toastify';

const WishList = () => {
  const { wishListItems, foodList, addToCart, handlWishList } = useContext(
    UserContext
  );

  const navigate = useNavigate();

  const addAllWishListItems = () => {
    wishListItems.forEach((itemId) => addToCart(itemId));
    toast.success('All items added to the cart', {
      position: 'bottom-right',
    });
  };

  const removeAllWishListItems = () => {
    wishListItems.forEach((itemId) => handlWishList(itemId, true));
    toast.success('All wishList items removed !', {
      position: 'bottom-right',
    });
  };

  if (!wishListItems.length) {
    return (
      <Flex
        alignItems='center'
        justifyContent='center'
        flexDir='column'
        gap='60px'
      >
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
      </Flex>
    );
  }

  return (
    <>
      <Flex gap='12px' alignItems='center' justifyContent='end'>
        <Button colorScheme='teal' onClick={addAllWishListItems}>
          Add All items to cart
          <Icon as={MdFileDownloadDone} ms='6px' transform='scale(1.2)' />
        </Button>

        <Button colorScheme='red' onClick={removeAllWishListItems}>
          <Icon as={MdDeleteForever} me='4px' />
          Clear wishList items
        </Button>
      </Flex>

      <Grid
        templateColumns='repeat(auto-fill, minmax(240px, 1fr))'
        mt='30px'
        gap='30px'
        rowGap='50px'
      >
        {foodList.map((item, index) => {
          if (wishListItems.includes(item._id)) {
            return <WishListItem key={index} item={item} />;
          }
        })}
      </Grid>
    </>
  );
};

export default WishList;
