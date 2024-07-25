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
import { AuthContext } from '../../context/AuthContext';
import { CategoryService } from '../../services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';

const CategoryList = () => {
  const { backendUrl } = useContext(AuthContext);
  const [deletingData, setDeletingData] = useState([false, null]);
  const [isFetching, setIsFetching] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const navigate = useNavigate();

  const fetchCategoryList = async () => {
    setIsFetching(true);
    try {
      const response = await CategoryService.listCategory();
      setCategoryData(response.data.data);
    } catch (error) {
      toast.error(error);
    }
    setIsFetching(false);
  };

  const handleEditCategory = (data) => {
    navigate('/add', {
      state: { ...data, type: 'category' },
    });
  };

  const handleRemoveCategory = async (categoryID) => {
    setDeletingData([true, categoryID]);
    try {
      const response = await CategoryService.removeCategory(categoryID);

      await fetchCategoryList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error('Error while deleting data');
      }
    } catch (error) {
      toast.error(error);
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
                  src={`${backendUrl}/images/` + category.image}
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
                    <MdEdit />
                    Edit
                  </Button>
                  <Button
                    variant='ghost'
                    colorScheme='orange'
                    isLoading={deletingData[1] === category._id ? true : false}
                    onClick={() => handleRemoveCategory(category._id)}
                  >
                    <MdDelete />
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
