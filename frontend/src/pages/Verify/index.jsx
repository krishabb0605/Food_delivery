import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';
import { orderService } from '../../services';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await orderService.verifyOrder(success, orderId);
    if (response.data.success) {
      navigate('/myorders');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <Flex alignItems='center' justifyContent='center' h='40vh'>
      <Spinner size='md' />
    </Flex>
  );
};

export default Verify;
