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
  Text,
  Textarea,
  Switch,
} from '@chakra-ui/react';
import foodService from '../../services/food.service';
import { categoryService } from '../../services';

const Add = () => {
  const [image, setImage] = useState(false);
  const [addingData, setAddingData] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
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
    formData.append('image', image);
    isChecked && formData.append('description', data.description);
    isChecked && formData.append('price', Number(data.price));
    isChecked && formData.append('category', data.category);

    setAddingData(true);

    for (const [key, value] of Object.entries(data)) {
      if (isChecked) {
        if (value === '' || image === false) {
          setAddingData(false);
          return toast.error('Fill all details');
        }
      } else {
        if ((key === 'name' && value === '') || image === false) {
          setAddingData(false);
          return toast.error('Fill all details');
        }
      }
    }
    let response;

    if (isChecked) {
      response = await foodService.addFood(formData);
      console.log(response);
    } else {
      response = await categoryService.addCategory(formData);
    }
    console.log(response);
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
      <Flex justifyContent='center' mb='20px' mt='5px'>
        <Switch
          colorScheme='green'
          isChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
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
                color: isChecked ? 'white' : 'black',
                display: 'block',
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '50%',
                left: '24%',
                fontWeight: 'bold',
                fontSize: isChecked ? '14px' : '12px',
                zIndex: '1',
              },
              '&:focus-visible': {
                boxShadow: 'none',
                outline: 'none',
              },
              '&::before': {
                content: '"CATEGORY"',
                color: isChecked ? 'black' : 'white',
                display: 'block',
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '50%',
                left: '75%',
                fontWeight: 'bold',
                fontSize: isChecked ? '12px' : '14px',
                zIndex: '1',
              },
            },
            '.chakra-switch__thumb': {
              width: '90px',
              height: '36px',
              backgroundColor: 'white',
              transform: isChecked
                ? 'translate(93px,-2px) !important'
                : 'translate(-3px,-2px) !important',
            },
          }}
        />
      </Flex>

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
          <Text>{isChecked ? 'Item' : 'Category'} name</Text>
          <Input
            p='10px'
            type='text'
            name='name'
            placeholder='Type here'
            onChange={onChangeHandler}
            value={data.name}
            borderColor='#0000004d'
          />
        </Flex>
        {isChecked && (
          <Flex flexDir='column' gap='20px'>
            <Flex flexDir='column' gap='20px' width='max(40%,280px)'>
              <Text>Item Description</Text>
              <Textarea
                p='10px'
                name='description'
                rows='6'
                placeholder='Write Content here'
                onChange={onChangeHandler}
                value={data.description}
                borderColor='#0000004d'
                required
              ></Textarea>
            </Flex>
            <Flex gap='30px'>
              <Flex flexDir='column' gap='20px'>
                <Text>Item category</Text>
                <Select
                  name='category'
                  onChange={onChangeHandler}
                  maxW='120px'
                  borderColor='#0000004d'
                >
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
                <Text>Item price</Text>
                <Input
                  maxW='120px'
                  p='10px'
                  type='number'
                  name='price'
                  onChange={onChangeHandler}
                  value={data.price}
                  placeholder='$20'
                  borderColor='#0000004d'
                />
              </Flex>
            </Flex>
          </Flex>
        )}
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
