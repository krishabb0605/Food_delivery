import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

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
        />

        {!cartItems[id] ? (
          <Image
            width='35px'
            pos='absolute'
            bottom='15px'
            right='15px'
            cursor='pointer'
            borderRadius='50%'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt='white'
          />
        ) : (
          <Flex
            pos='absolute'
            bottom='15px'
            right='15px'
            alignItems='center'
            gap='10px'
            padding='6px'
            borderRadius='50px'
            backgroundColor='white'
          >
            <Image
              src={assets.remove_icon_red}
              alt='descrease'
              width='30px'
              cursor='pointer'
              onClick={() => removeFromCart(id)}
            />
            <Text>{cartItems[id]}</Text>
            <Image
              src={assets.add_icon_green}
              alt='increase'
              width='30px'
              cursor='pointer'
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
          <Image width='70px' src={assets.rating_starts} alt='rating-star' />
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
