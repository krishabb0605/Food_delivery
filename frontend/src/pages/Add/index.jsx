import React, { useContext, useState } from 'react';
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
  Text,
  Textarea,
} from '@chakra-ui/react';
import foodService from '../../services/food.service';

const Add = () => {
  const [image, setImage] = useState(false);
  const [addingData, setAddingData] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);
    setAddingData(true);

    for (const [key, value] of Object.entries(data)) {
      if (value === '' || image === false) {
        setAddingData(false);
        return toast.error('Fill all details');
      }
    }

    const response = await foodService.addFood(formData);
    if (response.data.success) {
      setData({
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
    setAddingData(false);
  };

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
      <FormControl display='flex' flexDir='column' gap='20px'>
        <Flex flexDir='column' gap='20px'>
          <Text>Upload Image</Text>
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
          <Text>Product name</Text>
          <Input
            p='10px'
            type='text'
            name='name'
            placeholder='Type here'
            onChange={onChangeHandler}
            value={data.name}
          />
        </Flex>
        <Flex flexDir='column' gap='20px' width='max(40%,280px)'>
          <Text>Product Description</Text>
          <Textarea
            p='10px'
            name='description'
            rows='6'
            placeholder='Write Content here'
            onChange={onChangeHandler}
            value={data.description}
            required
          ></Textarea>
        </Flex>
        <Flex gap='30px'>
          <Flex flexDir='column' gap='20px'>
            <Text>Product category</Text>
            <Select name='category' onChange={onChangeHandler} maxW='120px'>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Desserts'>Desserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure veg'>Pure veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </Select>
          </Flex>
          <Flex flexDir='column' gap='20px'>
            <Text>Product price</Text>
            <Input
              maxW='120px'
              p='10px'
              type='number'
              name='price'
              onChange={onChangeHandler}
              value={data.price}
              placeholder='$20'
            />
          </Flex>
        </Flex>
        <Button
          onClick={onSubmitHandler}
          maxW='120px'
          colorScheme='blackAlpha'
          isLoading={addingData}
        >
          Add
        </Button>
      </FormControl>
    </Box>
  );
};

export default Add;
