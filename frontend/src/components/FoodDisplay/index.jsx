import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem';
import { Box, Grid, Text } from '@chakra-ui/react';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
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
        {food_list.map((item, index) => {
          if (category === 'All' || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </Grid>
    </Box>
  );
};

export default FoodDisplay;
