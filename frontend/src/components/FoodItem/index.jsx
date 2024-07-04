import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { FaRegStar, FaStar } from 'react-icons/fa';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(
    StoreContext
  );

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
          src={url + '/images/' + image}
          alt='food_item_image'
          width='100%'
          borderRadius='15px 15px 0px 0px'
          userSelect='none'
        />

        {!cartItems[id] ? (
          <Icon
            background='white'
            p='4px'
            transform='scale(2)'
            pos='absolute'
            bottom='15px'
            right='15px'
            cursor='pointer'
            borderRadius='50%'
            onClick={() => addToCart(id)}
            as={IoMdAdd}
            alt='white'
          />
        ) : (
          <Flex
            pos='absolute'
            bottom='15px'
            right='15px'
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
              onClick={() => removeFromCart(id)}
            />
            <Text userSelect='none'>{cartItems[id]}</Text>
            <Icon
              p='4px'
              transform='scale(2)'
              alt='increase'
              color='green'
              bg='#d5ffd9'
              borderRadius='50%'
              cursor='pointer'
              as={IoMdAdd}
              onClick={() => addToCart(id)}
            />
          </Flex>
        )}
      </Box>
      <Box p='20px'>
        <Flex justifyContent='space-between' alignItems='center' mb='10px'>
          <Text fontSize='20px' fontWeight='600'>
            {name}
          </Text>
          <Flex gap='4px'>
            <Icon as={FaStar} alt='rating-star' color='orange' />
            <Icon as={FaStar} alt='rating-star' color='orange' />
            <Icon as={FaStar} alt='rating-star' color='orange' />
            <Icon as={FaStar} alt='rating-star' color='orange' />
            <Icon as={FaRegStar} alt='rating-star' color='orange' />
          </Flex>
        </Flex>
        <Text color='#676767'>{description}</Text>
        <Text color='tomato' fontWeight='500' my='10px'>
          ${price}
        </Text>
      </Box>
    </Box>
  );
};

export default FoodItem;
