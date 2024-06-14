import React, { useContext, useState } from 'react';
import './Home.css';
import {
  AppDownload,
  ExploreMenu,
  FoodDisplay,
  Header,
} from '../../components';
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const [category, setCategory] = useState('All');
  const { isFetching } = useContext(StoreContext);

  if (isFetching) {
    return (
      <div className='verify'>
        <div className='spinner' />
      </div>
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
