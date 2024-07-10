import React, { useContext } from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { StoreContext } from '../../context/StoreContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
  
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

const ExploreMenu = () => {
  const { category, handleCategory, categoryData, url } = useContext(
    StoreContext
  );

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
      <Slider {...settings}>
        {categoryData.map((item, index) => {
          return (
            <Flex
              display='flex !important'
              justifyContent='center'
              alignItems='center'
              flexDir='column'
              _focusVisible={{ outline: 'none' }}
              key={index}
              onClick={() =>
                handleCategory((prev) => (prev === item.name ? '' : item.name))
              }
            >
              <Image
                border={category === item.name ? '4px solid tomato' : ''}
                padding={category === item.name ? '2px' : '0px'}
                src={`${url}/images/` + item.image}
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
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Slider>

      <hr />
    </Flex>
  );
};

export default ExploreMenu;
