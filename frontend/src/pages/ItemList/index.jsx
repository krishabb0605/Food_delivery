import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

import { StoreContext } from '../../context/StoreContext';
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { foodService } from '../../services';

const ItemList = () => {
  const { url } = useContext(StoreContext);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  const fetchList = async () => {
    try {
      const response = await foodService.listFood();
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

  const handleRemoveFood = async (foodId) => {
    setIsDeleting(true);
    setDeletedId(foodId);
    try {
      const response = await foodService.removeFood(foodId);

      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error('Error while deleting data');
      }
    } catch (error) {
      toast.error(error);
    }
    setIsDeleting(false);
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
      <Box overflow='auto' style={{ scrollbarWidth: 'thin' }}>
        <Grid
          templateColumns={{
            base: '1fr 3fr 1fr',
            md: '0.5fr 2fr 1fr 1fr 0.5fr',
          }}
          alignItems='center'
          gap={{ base: '15px', md: '10px' }}
          p='12px 15px'
          border='1px solid #cacaca'
          fontSize='13px'
          bg='#f9f9f9'
          display={{ base: 'none', md: 'grid' }}
        >
          <Text fontWeight='700'>Image</Text>
          <Text fontWeight='700'>Name</Text>
          <Text fontWeight='700'>Category</Text>
          <Text fontWeight='700'>Price</Text>
          <Text fontWeight='700' justifySelf='center'>
            Action
          </Text>
        </Grid>
        {list.map((item, index) => {
          return (
            <Grid
              templateColumns={{
                base: '1fr 3fr 1fr',
                md: '0.5fr 2fr 1fr 1fr 0.5fr',
              }}
              alignItems='center'
              gap={{ base: '15px', md: '10px' }}
              p='12px 15px'
              border='1px solid #cacaca'
              fontSize='13px'
              key={index}
            >
              <Image
                w='50px'
                h='40px'
                src={`${url}/images/` + item.image}
                alt='food-image'
              />
              <Text>{item.name}</Text>
              <Text>{item.category}</Text>
              <Text>$ {item.price}</Text>
              <Button
                cursor='pointer'
                isLoading={deletedId === item._id ? isDeleting : false}
                onClick={() => handleRemoveFood(item._id)}
              >
                <MdDelete />
              </Button>
            </Grid>
          );
        })}
      </Box>
    </Flex>
  );
};
export default ItemList;
