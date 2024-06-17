import React from 'react';
import './ChefDetail.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const ChefDetail = () => {
  const { url } = useContext(StoreContext);
  return <div>hello, chef</div>;
};

export default ChefDetail;
