import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md';

import { AuthContext } from '../../context/AuthContext';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FoodService } from '../../services';
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
  const { backendUrl } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedId, setDeletedId] = useState(null);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await FoodService.listFood();
      if (response.data.success) {
        setList(response.data.data);
        setIsLoading(false);
      } else {
        toast.error('Error while fetching the data');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEditFood = (data) => {
    navigate('/add', {
      state: { ...data, type: 'item' },
    });
  };

  const handleRemoveFood = async (foodId) => {
    setDeletedId(foodId);
    try {
      const response = await FoodService.removeFood(foodId);

      setList((prev) => prev.filter((data) => data._id !== foodId));

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error('Error while deleting data');
      }
    } catch (error) {
      toast.error(error);
    }
    setDeletedId(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (isLoading) {
    return (
      <Flex alignItems='center' justifyContent='center' h='40vh' w='80%'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Flex
      flexDir='column'
      gap='20px'
      width='76%'
      mx='auto'
      mt='50px'
      color='#6d6d69'
      fontSize='16px'
      height='calc(100vh - 150px)'
      overflow='auto'
      style={{ scrollbarWidth: 'thin' }}
    >
      <Text>All Foods List</Text>

      <Flex
        flexWrap='wrap'
        justifyContent={{ base: 'center', lg: 'space-between' }}
        gap='16px'
        height='calc(100vh - 150px)'
        overflow='auto'
        style={{ scrollbarWidth: 'thin' }}
      >
        {list.map((item, index) => (
          <Card
            key={index}
            direction={{ base: 'column', lg: 'row' }}
            overflow='hidden'
            variant='outline'
            width='fit-content'
            h={{ base: 'unset', lg: '150px' }}
            w={{ base: 'unset', lg: '328px' }}
          >
            <Image
              objectFit='cover'
              w={{ base: '280px', lg: '150px' }}
              p='12px'
              boxShadow='0px 0px 16px 0px gray'
              src={`${backendUrl}/images/` + item.image}
              alt='Food-Image'
            />

            <Stack>
              <CardBody py='0'>
                <Tooltip label={item.name}>
                  <Heading
                    size='md'
                    maxW='140px'
                    overflow='hidden'
                    style={{ textWrap: 'nowrap' }}
                    textOverflow='ellipsis'
                    py='8px'
                  >
                    {item.name}
                  </Heading>
                </Tooltip>
                <Flex gap='4px'>
                  <Text fontWeight='bold' fontSize='14px'>
                    Category :{' '}
                  </Text>
                  <Text fontSize='14px'>{item.category}</Text>
                </Flex>
                <Flex gap='4px'>
                  <Text fontWeight='bold' fontSize='14px'>
                    Price :{' '}
                  </Text>
                  <Text fontSize='14px'>$ {item.price}</Text>
                </Flex>
              </CardBody>

              <CardFooter justifyContent='space-evenly' pt='0' pb='8px' px='0'>
                <Button
                  p='0px'
                  variant='ghost'
                  colorScheme='blue'
                  onClick={() => handleEditFood(item)}
                >
                  <MdEdit />
                  Edit
                </Button>
                <Button
                  p='0px'
                  variant='ghost'
                  colorScheme='orange'
                  isLoading={deletedId === item._id ? true : false}
                  onClick={() => handleRemoveFood(item._id)}
                >
                  <MdDelete />
                  Remove
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};
export default ItemList;
