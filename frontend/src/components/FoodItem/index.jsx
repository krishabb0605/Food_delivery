import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import { Box, Flex, Icon, Image, Text, useDisclosure } from '@chakra-ui/react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { FaHeart, FaRegStar, FaStar } from 'react-icons/fa';
import WishListModel from '../WishListModel';
import { uniq } from 'lodash';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ item }) => {
  const { backendUrl } = useContext(AuthContext);
  let { cartItems, addToCart, removeFromCart, wishListItems } = useContext(
    UserContext
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

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
          cursor='pointer'
          onClick={() => navigate('/food-detail', { state: { item } })}
        />
        <Box pos='absolute' top='2px' left='6px' p='8px 4px'>
          <Icon
            as={FaHeart}
            fill={wishListArray?.includes(item._id) ? 'red' : 'white'}
            transform='scale(1.2)'
            cursor='pointer'
            onClick={() => onOpen()}
            style={{
              filter: 'drop-shadow(rgba(0, 0, 0, 0.75) 0px 0px 12px)',
            }}
          />
        </Box>

        {!cartItems[item._id] ? (
          <Icon
            background='white'
            p='4px'
            transform='scale(2)'
            pos='absolute'
            bottom='15px'
            right='15px'
            cursor='pointer'
            borderRadius='50%'
            onClick={() => addToCart(item._id)}
            as={IoMdAdd}
            alt='white'
          />
        ) : (
          <Flex
            pos='absolute'
            bottom='6px'
            right='6px'
            alignItems='center'
            gap='16px'
            padding='8px 12px'
            borderRadius='50px'
            backgroundColor='white'
          >
            <Icon
              p='4px'
              transform='scale(2)'
              alt='descrease'
              bg='#fecfd2'
              color='red'
              borderRadius='50%'
              as={IoMdRemove}
              cursor='pointer'
              onClick={() => removeFromCart(item._id)}
            />
            <Text userSelect='none'>{cartItems[item._id]}</Text>
            <Icon
              p='4px'
              transform='scale(2)'
              alt='increase'
              color='green'
              bg='#d5ffd9'
              borderRadius='50%'
              cursor='pointer'
              as={IoMdAdd}
              onClick={() => addToCart(item._id)}
            />
          </Flex>
        )}
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
        <Flex gap='4px' color='tomato' fontWeight='500' my='10px'>
          $ <Text fontSize='20px'>{item.price}</Text>
        </Flex>
      </Box>
      <WishListModel isOpen={isOpen} onClose={onClose} id={item._id} />
    </Box>
  );
};

export default FoodItem;
