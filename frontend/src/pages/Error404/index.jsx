import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <Flex
      h={window.innerHeight}
      w={window.innerWidth}
      alignItems='center'
      justifyContent='center'
    >
      <Card>
        <CardHeader fontWeight='bold' fontSize='28px'>
          Page Not Found
        </CardHeader>
        <CardBody maxW={{ base: '350px', sm: '540px' }}>
          Looks like you've followed a broken link or entered a url that doesn't
          exist on this site .
        </CardBody>
        <CardFooter
          alignItems='center'
          gap='8px'
          onClick={() => navigate('/')}
          color='green'
          cursor='pointer'
        >
          <Icon as={IoMdArrowRoundBack} />
          <Text>Back to our site</Text>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default Error404;
