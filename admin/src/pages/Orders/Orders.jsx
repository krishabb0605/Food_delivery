import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data);
      setIsLoading(false);
    } else {
      toast.error('Error while fetching order list');
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      fetchAllOrders();
    } else {
      toast.error('Error while fetching order list');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (isLoading) {
    return (
      <div className='verify'>
        <div className='spinner'></div>
      </div>
    );
  }

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt='icon' />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  return (
                    <li key={index}>{(item.name += ' x ' + item.quantity)}</li>
                  );
                })}
              </p>
              <p className='order-item-name'>
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street + ','}</p>
                <p>
                  {order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.country +
                    ', ' +
                    order.address.zipcode}
                </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <b>${order.amount}</b>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value='Food Processing'>Food Processing</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
