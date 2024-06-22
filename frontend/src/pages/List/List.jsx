import React, { useContext, useEffect, useState } from 'react';
import './List.css';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const List = () => {
  const { url } = useContext(StoreContext);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      setIsLoading(false);
    } else {
      toast.error('Error while fetching the data');
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Error while deleting data');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (isLoading) {
    return (
      <div className='verify'>
        <div className='spinner'></div>
      </div>
    );
  }

  return (
    <div className='list admin-add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt='food-image' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className='cursor' onClick={() => removeFood(item._id)}>
                <MdDelete />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default List;