import React, { useContext, useEffect, useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const Add = () => {
  const { url } = useContext(StoreContext);
  const [image, setImage] = useState(false);
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
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    const response = await axios.post(`${url}/api/food/add`, formData);
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
  };

  return (
    <div className='admin-add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt='upload-area'
            />
          </label>
          <input
            type='file'
            id='image'
            onChange={(event) => setImage(event.target.files[0])}
            hidden
            required
          />
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input
            type='text'
            name='name'
            placeholder='Type here'
            onChange={onChangeHandler}
            value={data.name}
          />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea
            name='description'
            rows='6'
            placeholder='Write Content here'
            onChange={onChangeHandler}
            value={data.description}
            required
          ></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product category</p>
            <select name='category' onChange={onChangeHandler}>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Desserts'>Desserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure veg'>Pure veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product price</p>
            <input
              type='number'
              name='price'
              onChange={onChangeHandler}
              value={data.price}
              placeholder='$20'
            />
          </div>
        </div>
        <button type='submit' className='add-btn'>
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;