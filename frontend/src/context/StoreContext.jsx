import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { cartService, categoryService, foodService } from '../services';
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';

const url = API_BASE_URL;
axios.defaults.baseURL = url;

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const { pathname } = useLocation();

  const [token, setToken] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await cartService.addToCart(itemId, token);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await cartService.removeFromCart(itemId, token);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    setIsFetching(true);
    try {
      const response = await foodService.listFood();
      setFoodList(response.data.data);
    } catch (error) {
      toast.error(error);
    }
    setIsFetching(false);
  };

  const fetchCategoryList = async () => {
    setIsFetching(true);
    try {
      const response = await categoryService.listCategory();
      setCategoryData(response.data.data);
    } catch (error) {
      toast.error(error);
    }
    setIsFetching(false);
  };

  const handleCategory = (category) => {
    setCategory(category);
  };

  const loadCartData = async (token) => {
    try {
      const response = await cartService.getCart(token);
      setCartItems(response.data.cartData);
    } catch (error) {
      toast.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('verified');

    setToken('');
    navigate('/login');
  };

  useEffect(() => {
    const loadData = async () => {
      if (
        localStorage.getItem('token') &&
        localStorage.getItem('verified') &&
        localStorage.getItem('role') === 'user'
      ) {
        await fetchFoodList();
        await fetchCategoryList();
        await loadCartData(localStorage.getItem('token'));
        setToken(localStorage.getItem('token'));
      }
    };
    loadData();
  }, [localStorage.getItem('token'), localStorage.getItem('verified')]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    isFetching,
    logout,
    category,
    handleCategory,
    categoryData,
    fetchCategoryList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
