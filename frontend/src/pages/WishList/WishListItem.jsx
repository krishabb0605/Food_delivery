import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FaHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { uniq } from 'lodash';

const WishListItem = ({ item, selectedList }) => {
  const { backendUrl } = useContext(AuthContext);
  const { addToCart, handlWishList, wishListItems } = useContext(UserContext);
  let wishListArray = uniq(Object.values(wishListItems).flat());

  return (
    <Box
      width='100%'
      margin='auto'
      borderRadius='15px'
      boxShadow='0px 0px 10px #00000015'
      transition='0.3s'
      animation='fadeIn 1s'
    >
      <Box pos='relative'>
        <Image
          src={backendUrl + '/images/' + item.image}
          alt='food_item_image'
          width='100%'
          h='194px'
          borderRadius='15px 15px 0px 0px'
          userSelect='none'
        />

        <Box pos='absolute' top='0' p='10px'>
          <Icon
            as={FaHeart}
            fill={wishListArray?.includes(item._id) ? 'red' : 'white'}
            transform='scale(1.2)'
            cursor='pointer'
            onClick={() => handlWishList(item._id, selectedList)}
            style={{
              filter: 'drop-shadow(rgba(0, 0, 0, 0.75) 0px 0px 12px)',
            }}
          />
        </Box>
      </Box>

      <Box p='16px'>
        <Flex justifyContent='space-between' alignItems='center' mb='10px'>
          <Text
            fontSize='16px'
            fontWeight='600'
            w='116px'
            overflow='hidden'
            textOverflow='ellipsis'
            style={{ textWrap: 'nowrap' }}
            _hover={{
              textOverflow: 'clip',
              width: 'unset',
              overflow: 'unset',
            }}
          >
            {item.name}
          </Text>
          <Flex gap='4px'>
            <Icon as={FaStar} alt='rating-star' color='orange' />
            <Icon as={FaStar} alt='rating-star' color='orange' />
            <Icon as={FaStar} alt='rating-star' color='orange' />
            <Icon as={FaStar} alt='rating-star' color='orange' />
            <Icon as={FaRegStar} alt='rating-star' color='orange' />
          </Flex>
        </Flex>
        <Text color='#676767'>{item.description}</Text>
        <Flex
          gap='4px'
          color='tomato'
          fontWeight='500'
          my='10px'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex gap='4px' color='tomato' fontWeight='500' my='10px'>
            $ <Text fontSize='20px'>{item.price}</Text>
          </Flex>
          <Button
            onClick={() => {
              addToCart(item._id, true);
            }}
          >
            Add to cart
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default WishListItem;
