import React, { useEffect, useState } from 'react';

const MyOrder = ({ index, order }) => {
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    if (order.status === 'Food Processing') {
      setCurrentStep(1);
    } else if (order.status === 'Out for delivery') {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  }, []);

  return (
    <div className='my-orders-data' key={index}>
      <div className='my-order-data-header'>
        <p>Order #123</p>
        <p>h1</p>
      </div>
      <div className='my-order-data-body'>
        <div>
          <ul>
            {order.items.map((item, index) => {
              return (
                <li key={index}>{(item.name + ' x ' + item.quantity)}</li>
              );
            })}
          </ul>
          <p>Amount : ${order.amount}</p>
        </div>
        <ul className='stepper-vertical'>
          <li className={`step ${currentStep >= 1 ? 'completed' : ''}`}>
            <div>Food Processing</div>
          </li>
          <li className={`step ${currentStep >= 2 ? 'completed' : ''}`}>
            <div>Out for delivery</div>
          </li>
          <li className={`step ${currentStep >= 3 ? 'completed' : ''}`}>
            <div>Delivered</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyOrder;
