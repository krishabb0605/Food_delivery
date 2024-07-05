import React, { useContext, useEffect, useState } from 'react';
import { IoMdDownload } from 'react-icons/io';
import { FaBox, FaShareAlt } from 'react-icons/fa';
import moment from 'moment';
import { BlobProvider } from '@react-pdf/renderer';
import Invoice from '../Invoice';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import { Box, Flex, Text, Button, Icon } from '@chakra-ui/react';
import './index.css';

const MyOrder = ({ index, order, totalData, fetchOrders }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { url } = useContext(StoreContext);

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
        if (blob) {
          const file = new File([blob], 'invoice.pdf', {
            type: 'application/pdf',
          });
          await navigator.share({
            title: 'Invoice',
            text: 'Kindly find attached invoice',
            files: [file],
          });
          toast.success('Invoice shared successfully!');
        } else {
          toast.error('No blob available');
        }
      } catch (error) {
        toast.error('Error while sharing ');
      }
    } else {
      toast.error('Web Share API not supported');
    }
  };

  return (
    <Box key={index}>
      <Box
        width='100%'
        m='auto'
        borderRadius='15px'
        boxShadow='0px 0px 10px #00000015'
        transition='0.3s'
        animation='fadeIn 1s'
        bg='white'
      >
        <Flex
          justifyContent='space-between'
          alignSelf='center'
          p='4px'
          bg='#ff7100'
          color='white'
        >
          <Box>
            <Flex alignItems='center' gap='6px'>
              <Icon as={FaBox} alt='parcel-icon' ms='20px' />
              Order #{totalData - index}
            </Flex>
            <Text fontSize='12px' pl='18px'>
              {moment(order.date).format('D MMM YYYY, h:mm A')}
            </Text>
          </Box>

          <Flex alignItems='center' gap='8px'>
            <BlobProvider document={<Invoice order={order} url={url} />}>
              {({ url, blob }) => (
                <Flex
                  cursor='pointer'
                  bg='white'
                  color='tomato'
                  h='20px'
                  w='20px'
                  alignItems='center'
                  justifyContent='center'
                  borderRadius='2px'
                >
                  <a
                    href={url}
                    target='_blank'
                    style={{ color: 'tomato', height: 'inherit' }}
                  >
                    <IoMdDownload />
                  </a>
                </Flex>
              )}
            </BlobProvider>

            <BlobProvider document={<Invoice order={order} url={url} />}>
              {({ url, blob }) => (
                <Flex
                  cursor='pointer'
                  bg='white'
                  color='tomato'
                  h='20px'
                  w='20px'
                  alignItems='center'
                  justifyContent='center'
                  borderRadius='2px'
                  onClick={() => handleShare(blob)}
                  style={{ cursor: 'pointer' }}
                >
                  <FaShareAlt style={{ height: '12px' }} />
                </Flex>
              )}
            </BlobProvider>
          </Flex>
        </Flex>

        <Flex justifyContent='space-between' p='4px 8px' gap='10px'>
          <Flex flexDir='column' gap='8px'>
            <Flex
              flexDir='column'
              h='116px'
              overflowY='auto'
              fontSize='12px'
              style={{ scrollbarWidth: 'thin' }}
            >
              {order.items.map((item, index) => {
                return (
                  <Text key={index}>{item.name + ' x ' + item.quantity}</Text>
                );
              })}
            </Flex>
            <Text fontWeight='bold'>Amount : ${order.amount}</Text>
          </Flex>
          <Flex flexDir='column' className='stepper-vertical'>
            <Box className={`step ${currentStep >= 1 ? 'completed' : ''}`}>
              <Box
                maxW='78px'
                textAlign='center'
                color='#808080'
                className='process-name'
                fontSize='14px'
              >
                Food Processing
              </Box>
            </Box>
            <Box className={`step ${currentStep >= 2 ? 'completed' : ''}`}>
              <Box
                maxW='78px'
                textAlign='center'
                color='#808080'
                className='process-name'
                fontSize='14px'
              >
                Out for delivery
              </Box>
            </Box>
            <Box className={`step ${currentStep >= 3 ? 'completed' : ''}`}>
              <Box
                maxW='78px'
                textAlign='center'
                color='#808080'
                className='process-name'
                fontSize='14px'
              >
                Delivered
              </Box>
            </Box>
          </Flex>
        </Flex>

        <Flex
          alignItems='center'
          justifyContent='center'
          mt='-16px'
          onClick={fetchOrders}
        >
          <Button
            border='none'
            colorScheme='orange'
            w='max(8vw, 100px)'
            p='4px 0'
            borderRadius='4px'
            cursor='pointer'
            mt='8px'
            h='26px'
          >
            Track Order
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default MyOrder;
