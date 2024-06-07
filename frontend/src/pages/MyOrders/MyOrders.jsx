import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import MyOrder from '../MyOrder/MyOrder';

const MyOrders = () => {
  const [data, setData] = useState();
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/userOrders`,
      {},
      { headers: { token } }
    );
    const sortedData = response.data.data.sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    setData(sortedData);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        <div className='my-orders-datas'>
          {data &&
            data.map((order, index) => {
              return (
                <MyOrder
                  key={index}
                  index={index}
                  order={order}
                  totalData={data.length}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
