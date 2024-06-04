import React, { useState } from 'react';
import './Home.css';
import {
  AppDownload,
  ExploreMenu,
  FoodDisplay,
  Header,
} from '../../components';

const Home = () => {
  const [category, setCategory] = useState('All');
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
