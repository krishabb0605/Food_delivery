import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import FoodItem from '../FoodItem';
import { Box, Grid, Text } from '@chakra-ui/react';

const FoodDisplay = () => {
  const { foodList, category } = useContext(UserContext);

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
            category === '' ||
            category === item.category ||
            category === item.name
          ) {
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
