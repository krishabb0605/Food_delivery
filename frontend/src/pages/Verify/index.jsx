import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { Flex, Spinner } from '@chakra-ui/react';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();

  const { url } = useContext(StoreContext);

  const verifyPayment = async () => {
    const response = await axios.post(`${url}/api/order/verify`, {
      success,
      orderId,
    });
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
