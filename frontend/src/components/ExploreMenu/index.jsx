import React, { useContext } from 'react';
import { menu_list } from '../../assets/assets';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { StoreContext } from '../../context/StoreContext';

const ExploreMenu = () => {
  const { category, handleCategory } = useContext(StoreContext);

  return (
    <Flex flexDir='column' gap='20px' id='explore-menu'>
      <Text color='#262626' fontWeight='600' fontSize='28px'>
        Explore our menu
      </Text>
      <Text
        maxW={{ base: '100%', xl: '60%' }}
        color='#808080'
        fontSize={{ base: '14px', xl: 'unset' }}
      >
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience, one
        delicious meal at a time.
      </Text>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        gap='30px'
        textAlign='center'
        my='20px'
        overflowX='auto'
        style={{ scrollbarWidth: 'none' }}
      >
        {menu_list.map((item, index) => {
          return (
            <Box
              key={index}
              onClick={() =>
                handleCategory((prev) =>
                  prev === item.menu_name ? '' : item.menu_name
                )
              }
            >
              <Image
                border={category === item.menu_name ? '4px solid tomato' : ''}
                padding={category === item.menu_name ? '2px' : '0px'}
                src={item.menu_image}
                alt='menu-image'
                width='7.5vw'
                minW='80px'
                cursor='pointer'
                borderRadius='50%'
                transition='0.2s'
              />
              <Text
                mt='10px'
                color='#747474'
                fontSize='max(1.4vw, 16px)'
                cursor='pointer'
              >
                {item.menu_name}
              </Text>
            </Box>
          );
        })}
      </Flex>

      <hr />
    </Flex>
  );
};

export default ExploreMenu;
