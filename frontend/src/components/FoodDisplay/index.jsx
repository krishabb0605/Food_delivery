import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import FoodItem from '../FoodItem';
import { Box, Grid, Text } from '@chakra-ui/react';

const FoodDisplay = () => {
  const { foodList, filterQuery } = useContext(UserContext);

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
            return <FoodItem key={index} item={item} />;
          }
        })}
      </Grid>
    </Box>
  );
};

export default FoodDisplay;
