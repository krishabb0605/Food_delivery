import React, { useEffect, useState } from 'react';
import { IoMdDownload } from 'react-icons/io';
import { saveAs } from 'file-saver';
import { FaShareAlt } from 'react-icons/fa';
import moment from 'moment';
import { assets } from '../../assets/assets';
import { BlobProvider } from '@react-pdf/renderer';
import Invoice from '../Invoice/Invoice';
import { toast } from 'react-toastify';

const MyOrder = ({ index, order, totalData, fetchOrders }) => {
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    if (order.status === 'Food Processing') {
      setCurrentStep(1);
    } else if (order.status === 'Out for delivery') {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  }, [fetchOrders]);

  const handleShare = async (blob) => {
    if (navigator.share) {
      try {
        const blob = await new Promise((resolve) => {
          const string = `
            <html>
              <body>
                <h1>Invoice</h1>
                ${renderToString(<Invoice order={order} />)}
              </body>
            </html>
          `;
          const pdf = jsPDF();
          pdf.fromHTML(string);
          const blob = pdf.output('blob');
          resolve(blob);
        });

        await navigator.share({
          title: 'My Invoice',
          files: [new File([blob], 'invoice.pdf', { type: 'application/pdf' })],
        });
      } catch (error) {
        toast.error('Error while sharing file');
      }
    } else {
      toast.error('Web Share API not supported');
    }
  };

  return (
    <div key={index}>
      <div className='my-orders-data'>
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
                <div style={{ cursor: 'pointer' }}>
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
                <div
                  onClick={() => handleShare(url, blob)}
                  style={{ cursor: 'pointer' }}
                >
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
        <div className='track-order-btn' onClick={fetchOrders}>
          <button>Track Order</button>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
