import React, { useContext, useEffect, useState } from 'react';
import { Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import all_food_logo from '../../assets/All_food_logo.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CategoryService } from '../../services';
import { toast } from 'react-toastify';

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
  const { backendUrl } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);
  const { filterQuery, setFilterQuery } = useContext(UserContext);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      setIsFetching(true);
      try {
        const response = await CategoryService.listCategory();
        setCategoryList(response.data.data);
      } catch (error) {
        toast.error(error);
      }
      setIsFetching(false);
    };
    fetchCategoryList();
  }, []);

  if (isFetching) {
    return (
      <Flex alignItems='center' justifyContent='center'>
        <Spinner size='sm' />
      </Flex>
    );
  }

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
        <Flex
          display='flex !important'
          justifyContent='center'
          alignItems='center'
          flexDir='column'
          _focusVisible={{ outline: 'none' }}
          key='all'
          onClick={() => setFilterQuery('')}
        >
          <Image
            border={filterQuery === '' ? '4px solid tomato' : ''}
            padding={filterQuery === '' ? '2px' : '0px'}
            src={all_food_logo}
            alt='menu-image'
            width='7.5vw'
            minW='80px'
            height='7.5vw'
            minH='80px'
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
            All
          </Text>
        </Flex>
        {categoryList &&
          categoryList.map((item, index) => {
            return (
              <Flex
                display='flex !important'
                justifyContent='center'
                alignItems='center'
                flexDir='column'
                _focusVisible={{ outline: 'none' }}
                key={index}
                onClick={() =>
                  setFilterQuery((prev) =>
                    prev === item.name ? '' : item.name
                  )
                }
              >
                <Image
                  border={filterQuery === item.name ? '4px solid tomato' : ''}
                  padding={filterQuery === item.name ? '2px' : '0px'}
                  src={`${backendUrl}/images/` + item.image}
                  alt='menu-image'
                  width='7.5vw'
                  minW='80px'
                  height='7.5vw'
                  minH='80px'
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
