import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { cartService, categoryService, foodService } from '../services';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);

  const [foodList, setFoodList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const [category, setCategory] = useState('');

  const { pathname } = useLocation();
  const { token } = useContext(AuthContext);

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
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    const loadAllData = async () => {
      setIsFetching(true);
      try {
        const foodsData = await foodService.listFood();
        setFoodList(foodsData.data.data);

        const categorieData = await categoryService.listCategory();
        setCategoryList(categorieData.data.data);

        const cartData = await cartService.getCart(token);
        setCartItems(cartData.data.cartData);
      } catch (error) {
        toast.error(error);
      }
      setIsFetching(false);
    };
    loadAllData();
  }, []);

  const value = {
    isFetching,
    category,
    foodList,
    categoryList,
    cartItems,
    setCategory,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
