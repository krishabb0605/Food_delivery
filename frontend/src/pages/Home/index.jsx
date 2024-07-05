import React from 'react';
import {
  AppDownload,
  ExploreMenu,
  FoodDisplay,
  Header,
} from '../../components';

const Home = () => {
  return (
    <>
      <Header />
      <ExploreMenu />
      <FoodDisplay />
      <AppDownload />
    </>
  );
};

export default Home;
