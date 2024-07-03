import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  // const url = 'http://localhost:4001';

  const url = 'https://food-delivery-ed6j.onrender.com';

  const [token, setToken] = useState('');

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + '/api/cart/add',
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + '/api/cart/remove',
        { itemId },
        { headers: { token } }
      );
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
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
    setIsFetching(false);
  };

  const handleCategory = (category) => {
    setCategory(category);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + '/api/cart/get',
      {},
      {
        headers: { token },
      }
    );
    setCartItems(response.data.cartData);
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
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem('token') && localStorage.getItem('verified')) {
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
