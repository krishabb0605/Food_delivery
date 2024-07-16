import React, { useContext, useEffect, useState } from 'react';
import { IoMdDownload } from 'react-icons/io';
import { FaBox, FaShareAlt } from 'react-icons/fa';
import moment from 'moment';
import { BlobProvider } from '@react-pdf/renderer';
import Invoice from '../Invoice';
import { toast } from 'react-toastify';
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Stepper,
  Step,
  StepSeparator,
  useMediaQuery,
} from '@chakra-ui/react';
import { orderService } from '../../services';
import { StoreContext } from '../../context/StoreContext';

const MyOrder = ({ index, order, totalData, fetchOrders }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobileSize] = useMediaQuery('(max-width: 425px)');

  const { token } = useContext(StoreContext);

  const steps = [
    { label: 'Food Processing', isComplete: currentStep >= 1 },
    { label: 'Out for Delivery', isComplete: currentStep >= 2 },
    { label: 'Delivered', isComplete: currentStep >= 3 },
  ];

  useEffect(() => {
    if (order.status === 'Food Processing') {
      setCurrentStep(1);
    } else if (order.status === 'Out for delivery') {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  }, [fetchOrders]);

  const handleOrderData = async () => {
    if (order.paymentInfo) {
      fetchOrders();
    } else {
      try {
        let response = await orderService.placeOrder(order, token);

        if (response.data.success) {
          const { session_url, sessionId } = response.data;
          localStorage.setItem('sessionId', sessionId);
          window.location.replace(session_url);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

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

          {order.paymentInfo && (
            <Flex alignItems='center' gap='8px'>
              <BlobProvider
                document={<Invoice order={order} index={totalData - index} />}
              >
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

              {isMobileSize && (
                <BlobProvider
                  document={<Invoice order={order} index={totalData - index} />}
                >
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
              )}
            </Flex>
          )}
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

          {order.paymentInfo && (
            <Stepper
              orientation='vertical'
              padding='0'
              w='90px !important'
              alignItems='center !important'
            >
              {steps.map((step, index) => (
                <Box key={index} position='relative'>
                  <Step iscomplete={step.isComplete ? 'true' : 'false'}>
                    <Text
                      fontSize='14px'
                      color={step.isComplete ? 'green' : '#808080'}
                      fontWeight={step.isComplete ? 'bold' : 'normal'}
                      textAlign='center'
                    >
                      {step.label}
                    </Text>
                  </Step>
                  {index !== steps.length - 1 && (
                    <StepSeparator
                      height='30px !important'
                      top='38px !important'
                      left='44px !important'
                      maxH='50px !important'
                    />
                  )}
                </Box>
              ))}
            </Stepper>
          )}
        </Flex>

        <Flex
          alignItems='center'
          justifyContent='center'
          mt='-16px'
          onClick={handleOrderData}
        >
          <Button
            border='none'
            colorScheme={!order.paymentInfo ? 'green' : 'orange'}
            w={!order.paymentInfo ? 'max(9vw, 156px)' : 'max(8vw, 100px)'}
            p='4px 0'
            borderRadius='4px'
            cursor='pointer'
            mt='18px'
            h='26px'
          >
            {!order.paymentInfo ? 'Proceed to payment' : 'Track Order'}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default MyOrder;
