import React, { useContext, useState } from 'react';
import {
  AppDownload,
  ExploreMenu,
  FoodDisplay,
  Header,
} from '../../components';
import { StoreContext } from '../../context/StoreContext';
import { Flex, Spinner } from '@chakra-ui/react';

const Home = () => {
  const [category, setCategory] = useState('All');
  const { isFetching } = useContext(StoreContext);

  if (isFetching) {
    return (
      <Flex alignItems='center' justifyContent='center' h='40vh'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
