import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { categoryService } from '../../services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const { url } = useContext(StoreContext);
  const [deletingData, setDeletingData] = useState([false, null]);
  const [isFetching, setIsFetching] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const navigate = useNavigate();

  const fetchCategoryList = async () => {
    setIsFetching(true);
    const response = await categoryService.listCategory();
    setCategoryData(response.data.data);
    setIsFetching(false);
  };

  const handleEditCategory = (data) => {
    navigate('/', {
      state: { id: data._id, name: data.name, image: data.image },
    });
  };

  const handleRemoveCategory = async (categoryID) => {
    setDeletingData([true, categoryID]);

    const response = await categoryService.removeCategory(categoryID);

    await fetchCategoryList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Error while deleting data');
    }
    setDeletingData([false, null]);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  if (isFetching) {
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
      <Text>All Category List</Text>
      <Flex
        overflow='auto'
        flexWrap='wrap'
        style={{ scrollbarWidth: 'thin' }}
        gap='20px'
        alignItems='center'
        justifyContent='space-evenly'
        py='4px'
      >
        {categoryData &&
          categoryData.map((category, index) => (
            <Card
              maxW='sm'
              key={index}
              minW='200px'
              boxShadow='0px 0px 6px 1px #c5c5c5'
            >
              <CardBody
                display='flex'
                flexDir='column'
                gap='8px'
                alignItems='center'
              >
                <Image
                  src={`${url}/images/` + category.image}
                  alt='item'
                  borderRadius='50%'
                  h='130px'
                  w='130px'
                />

                <Heading size='md'>{category.name}</Heading>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing='2'>
                  <Button
                    variant='ghost'
                    colorScheme='blue'
                    onClick={() => handleEditCategory(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='ghost'
                    colorScheme='orange'
                    isLoading={deletingData[1] === category._id ? true : false}
                    onClick={() => handleRemoveCategory(category._id)}
                  >
                    Remove
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
      </Flex>
    </Flex>
  );
};

export default CategoryList;
