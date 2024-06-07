import React, { useEffect, useState } from 'react';
import { IoMdDownload } from 'react-icons/io';
import { saveAs } from 'file-saver';
import { FaShareAlt } from 'react-icons/fa';
import moment from 'moment';
import { assets } from '../../assets/assets';
import { BlobProvider } from '@react-pdf/renderer';
import Invoice from '../Invoice/Invoice';

const MyOrder = ({ index, order, totalData }) => {
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
  
  const handleShare = async (blob) => {
    await saveAs(blob, `invoice.pdf`);
    window.location.href = `mailto:?subject=${encodeURIComponent(
      `Invoice`
    )}&body=${encodeURIComponent(`Kindly find attached invoice`)}`;
  };

  return (
    <div className='my-orders-data' key={index}>
      <div className='my-order-data-header'>
        <div>
          <p>
            <img
              src={assets.parcel_icon}
              alt='parcel-icon'
              style={{ height: '16px' }}
            />
            Order #{totalData - index}
          </p>
          <p className='order-date'>
            {moment(order.date).format('D MMM YYYY, h:mm A')}
          </p>
        </div>
        <div className='right-icons'>
          <BlobProvider document={<Invoice order={order} />}>
            {({ url, blob }) => (
              <div>
                <a
                  href={url}
                  target='_blank'
                  style={{ color: 'tomato', height: 'inherit' }}
                >
                  <IoMdDownload />
                </a>
              </div>
            )}
          </BlobProvider>

          <BlobProvider document={<Invoice order={order} />}>
            {({ url, blob }) => (
              <div onClick={() => handleShare(url, blob)}>
                <FaShareAlt style={{ height: '12px' }} />
              </div>
            )}
          </BlobProvider>
        </div>
      </div>
      <div className='my-order-data-body'>
        <div className='order-list'>
          <ul>
            {order.items.map((item, index) => {
              return <li key={index}>{item.name + ' x ' + item.quantity}</li>;
            })}
          </ul>
          <b>Amount : ${order.amount}</b>
        </div>
        <ul className='stepper-vertical'>
          <li className={`step ${currentStep >= 1 ? 'completed' : ''}`}>
            <div className='process-name'>Food Processing</div>
          </li>
          <li className={`step ${currentStep >= 2 ? 'completed' : ''}`}>
            <div className='process-name'>Out for delivery</div>
          </li>
          <li className={`step ${currentStep >= 3 ? 'completed' : ''}`}>
            <div className='process-name'>Delivered</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyOrder;
