import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import FoodItem from '../FoodItem';
import { Box, Grid, Text } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';
import { WishListService } from '../../services';

const FoodDisplay = () => {
  const { foodList, filterQuery } = useContext(UserContext);
  const { token } = useContext(AuthContext);
  const [listName, setListName] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const response = await WishListService.getAllData(token);
      const wishListData = response.data.data;
      wishListData.forEach((data) =>
        setListName((prev) => [...prev, data.listName])
      );
    };
    getAllData();
  }, []);

  return (
    <Box mt='30px' id='food-display'>
      <Text fontSize='max(2vw, 24px)' fontWeight='700'>
        Top dishes near you
      </Text>
      <Grid
        templateColumns='repeat(auto-fill, minmax(240px, 1fr))'
        mt='30px'
        gap='30px'
        rowGap='50px'
      >
        {foodList.map((item, index) => {
          if (
            filterQuery === '' ||
            filterQuery === item.category ||
            filterQuery === item.name
          ) {
            return <FoodItem key={index} item={item} listName={listName} />;
          }
        })}
      </Grid>
    </Box>
  );
};

export default FoodDisplay;
