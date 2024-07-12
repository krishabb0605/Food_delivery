import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Select,
  Textarea,
  Switch,
  Spinner,
  FormLabel,
} from '@chakra-ui/react';
import { categoryService, foodService } from '../../services';
import { StoreContext } from '../../context/StoreContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Add = () => {
  const [image, setImage] = useState(false);
  const [addingData, setAddingData] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isState, setIsState] = useState(false);
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const [addedCategoryData, setAddedCategoryData] = useState({
    id: false,
    name: '',
    image: false,
  });

  const { categoryData, isFetching, fetchCategoryList, url } = useContext(
    StoreContext
  );
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryList();
    navigate(location.pathname, {});
  }, []);

  useEffect(() => {
    if (state) {
      setIsCategory(true);
      setIsState(true);
      const image = `${url}/images/` + state.image;
      setAddedCategoryData({
        id: state.id,
        name: state.name,
        image: image,
      });
    }
  }, [state]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setItemData((data) => ({ ...data, [name]: value }));
  };

  const handleItemAdd = async () => {
    const formData = new FormData();
    formData.append('name', itemData.name);
    formData.append('image', image);
    formData.append('description', itemData.description);
    formData.append('price', Number(itemData.price));
    formData.append('category', itemData.category);

    setAddingData(true);

    for (const [key, value] of Object.entries(itemData)) {
      if (value === '' || image === false) {
        setAddingData(false);
        return toast.error('Fill all details');
      }
    }
    try {
      let response = await foodService.addFood(formData);

      if (response.data.success) {
        setItemData({
          name: '',
          description: '',
          price: '',
          category: 'Salad',
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }

    setAddingData(false);
  };

  const handleCategoryAdd = async () => {
    const formData = new FormData();
    formData.append('name', addedCategoryData.name);
    if (typeof addedCategoryData.image === 'object') {
      formData.append('image', addedCategoryData.image);
    }

    setAddingData(true);

    for (const [key, value] of Object.entries(addedCategoryData)) {
      if (value === '' || (key === 'image' && value === false)) {
        setAddingData(false);
        return toast.error('Fill all details');
      }
    }

    let response;
    try {
      if (addedCategoryData.id) {
        // update data
        response = await categoryService.updateCategory(
          addedCategoryData.id,
          formData
        );
      } else {
        // add data
        response = await categoryService.addCategory(formData);
      }

      if (response.data.success) {
        setAddedCategoryData({
          name: '',
          image: false,
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setAddingData(false);
  };

  if (isFetching) {
    return (
      <Flex alignItems='center' justifyContent='center' h='40vh' w='80%'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <Box
      width='76%'
      ml='max(5vw,25px)'
      mt='50px'
      color='#6d6d69'
      fontSize='16px'
      height='calc(100vh - 150px)'
      overflow='auto'
      style={{ scrollbarWidth: 'thin' }}
    >
      <Flex justifyContent='center' mb='20px' mt='5px'>
        <Switch
          colorScheme='green'
          isChecked={isCategory}
          onChange={() => setIsCategory(!isCategory)}
          size='lg'
          height='30px'
          _focusVisible={{ boxShadow: 'none', outline: 'none' }}
          sx={{
            '.chakra-switch__track': {
              position: 'relative',
              backgroundColor: '#DD6B20',
              minWidth: '180px',
              height: '32px',
              boxShadow: '0px 0px 10px 0px #505050',
              '&::after': {
                content: '"ITEM"',
                color: isCategory ? 'white' : 'black',
                display: 'block',
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '50%',
                left: '24%',
                fontWeight: 'bold',
                fontSize: isCategory ? '14px' : '12px',
                zIndex: '1',
              },
              '&:focus-visible': {
                boxShadow: 'none',
                outline: 'none',
              },
              '&::before': {
                content: '"CATEGORY"',
                color: isCategory ? 'black' : 'white',
                display: 'block',
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '50%',
                left: '75%',
                fontWeight: 'bold',
                fontSize: isCategory ? '12px' : '14px',
                zIndex: '1',
              },
            },
            '.chakra-switch__thumb': {
              width: '90px',
              height: '36px',
              backgroundColor: 'white',
              transform: isCategory
                ? 'translate(93px,-2px) !important'
                : 'translate(-3px,-2px) !important',
            },
          }}
        />
      </Flex>

      {!isCategory ? (
        <FormControl display='flex' flexDir='column' gap='20px' isRequired>
          <Flex flexDir='column' gap='20px'>
            <FormLabel>Upload Image</FormLabel>
            <label htmlFor='image'>
              <Image
                w='120px'
                cursor='pointer'
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt='upload-area'
              />
            </label>
            <Input
              type='file'
              id='image'
              onChange={(event) => setImage(event.target.files[0])}
              hidden
              required
            />
          </Flex>
          <Flex width='max(40%,280px)' flexDir='column' gap='20px'>
            <FormLabel>Item name</FormLabel>
            <Input
              p='10px'
              type='text'
              name='name'
              placeholder='Type here'
              onChange={onChangeHandler}
              value={itemData.name}
              borderColor='#0000004d'
              required
            />
          </Flex>
          <Flex flexDir='column' gap='20px'>
            <Flex flexDir='column' gap='20px' width='max(40%,280px)'>
              <FormLabel>Item Description</FormLabel>
              <Textarea
                p='10px'
                name='description'
                rows='6'
                placeholder='Write Content here'
                onChange={onChangeHandler}
                value={itemData.description}
                borderColor='#0000004d'
                required
              ></Textarea>
            </Flex>
            <Flex gap='30px'>
              <Flex flexDir='column' gap='20px'>
                <FormLabel>Item category</FormLabel>
                <Select
                  name='category'
                  onChange={onChangeHandler}
                  maxW='120px'
                  borderColor='#0000004d'
                >
                  {categoryData.map((data) => (
                    <option value={data.name} key={data.name}>
                      {data.name}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Flex flexDir='column' gap='20px'>
                <FormLabel>Item price</FormLabel>
                <Input
                  maxW='120px'
                  p='10px'
                  type='number'
                  name='price'
                  onChange={onChangeHandler}
                  value={itemData.price}
                  placeholder='$20'
                  borderColor='#0000004d'
                  required
                />
              </Flex>
            </Flex>
          </Flex>
          <Button
            onClick={handleItemAdd}
            maxW='120px'
            colorScheme='blackAlpha'
            isLoading={addingData}
          >
            Add
          </Button>
        </FormControl>
      ) : (
        <FormControl display='flex' flexDir='column' gap='20px' isRequired>
          <Flex flexDir='column' gap='20px'>
            <FormLabel>Upload Image</FormLabel>
            <label htmlFor='image'>
              <Image
                w='120px'
                cursor='pointer'
                src={
                  typeof addedCategoryData.image === 'string'
                    ? addedCategoryData.image
                    : addedCategoryData.image
                    ? URL.createObjectURL(addedCategoryData.image)
                    : assets.upload_area
                }
                alt='upload-area'
              />
            </label>
            <Input
              type='file'
              id='image'
              onChange={(event) =>
                setAddedCategoryData((prev) => ({
                  ...prev,
                  image: event.target.files[0],
                }))
              }
              hidden
              required
            />
          </Flex>
          <Flex width='max(40%,280px)' flexDir='column' gap='20px'>
            <FormLabel>Category name</FormLabel>
            <Input
              p='10px'
              type='text'
              name='name'
              placeholder='Type here'
              onChange={(event) =>
                setAddedCategoryData((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              value={addedCategoryData.name}
              borderColor='#0000004d'
            />
          </Flex>

          <Button
            onClick={handleCategoryAdd}
            maxW='120px'
            colorScheme='blackAlpha'
            isLoading={addingData}
          >
            {isState ? 'Update' : 'Add'}
          </Button>
        </FormControl>
      )}
    </Box>
  );
};

export default Add;
