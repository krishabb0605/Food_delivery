import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';
import ConfirmModal from '../ConfirmModal';

const FoodDetail = () => {
  const location = useLocation();
  const item = location.state?.item;
  const { backendUrl, token } = useContext(AuthContext);
  const { addToCart, removeFromCart, cartItems } = useContext(UserContext);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const navigate = useNavigate();

  const itemQuantity = cartItems[item?._id] || 0;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleRemoveClick = () => {
    if (itemQuantity > 0) {
      removeFromCart(item._id);
    }
  };

  useEffect(() => {
    if (!item) {
      navigate('/');
    }
  }, []);

  return (
    <Card
      direction={{ base: 'column', md: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      {item && (
        <>
          <Box
            flex='1'
            position='relative'
            overflow='hidden'
            backgroundImage={`url(${backendUrl + '/images/' + item.image})`}
            cursor='pointer'
            backgroundSize={{ base: '100%', sm: '180%' }}
            backgroundPosition={backgroundPosition}
            onMouseMove={handleMouseMove}
            _hover={{ img: { opacity: 0 } }}
          >
            <Image
              objectFit='cover'
              w='100%'
              width='100%'
              height='100%'
              pointerEvents='none'
              src={backendUrl + '/images/' + item.image}
              alt={item.name}
            />
          </Box>
          <Stack flex='1'>
            <CardBody>
              <Heading size='md'>{item.name}</Heading>

              <Text py='2'>{item.description}</Text>

              <Flex alignItems='center' gap='4px'>
                <Text fontWeight='600'>Category : </Text>
                <Text>{item.category}</Text>
              </Flex>

              <Flex alignItems='center' gap='4px'>
                <Text fontWeight='600'>Price : </Text>
                <Text>{item.price}</Text>
              </Flex>

              <Flex gap='20px'>
                <Text fontWeight='600'>Ingredients : </Text>
                <UnorderedList>
                  {item.ingredients.map((ingredient, index) => {
                    return <ListItem key={index}>{ingredient}</ListItem>;
                  })}
                </UnorderedList>
              </Flex>
            </CardBody>

            <CardFooter gap='24px'>
              <Button colorScheme='orange'>Add to cart</Button>
              <Flex
                alignItems='center'
                gap='16px'
                padding='8px 12px'
                borderRadius='50px'
                backgroundColor='white'
              >
                <Icon
                  p='4px'
                  transform='scale(2)'
                  alt='decrease'
                  bg={itemQuantity > 0 ? '#fecfd2' : '#e0e0e0'}
                  color={itemQuantity > 0 ? 'red' : '#a0a0a0'}
                  borderRadius='50%'
                  as={IoMdRemove}
                  cursor={itemQuantity > 0 ? 'pointer' : 'not-allowed'}
                  onClick={handleRemoveClick}
                />
                <Text userSelect='none'>{itemQuantity}</Text>
                <Icon
                  p='4px'
                  transform='scale(2)'
                  alt='increase'
                  color='green'
                  bg='#d5ffd9'
                  borderRadius='50%'
                  cursor='pointer'
                  as={IoMdAdd}
                  onClick={() => {
                    !token ? onConfirmOpen() : addToCart(item._id);
                  }}
                />
              </Flex>
            </CardFooter>
          </Stack>
        </>
      )}
      <ConfirmModal isOpen={isConfirmOpen} onClose={onConfirmClose} />
    </Card>
  );
};

export default FoodDetail;
