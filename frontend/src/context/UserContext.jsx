import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { CartService, FoodService, WishListService } from '../services';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(true);

  const [foodList, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  let [wishListItems, setWishListItems] = useState([]);
  wishListItems = wishListItems.flat();

  const [filterQuery, setFilterQuery] = useState('');

  const { pathname } = useLocation();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const addToCart = async (itemId, isSuccess) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await CartService.addToCart(itemId, token);
        if (isSuccess) {
          toast.success('Item added to the cart.', {
            position: 'bottom-right',
          });
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await CartService.removeFromCart(itemId, token);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handlWishList = async (itemId, listName) => {
    if (wishListItems.includes(itemId)) {
      setWishListItems((prev) => prev.filter((item) => item !== itemId));
      try {
        const response = await WishListService.updateCart(
          { itemId, listName },
          token
        );

        toast.success(response.data.message, {
          position: 'bottom-right',
        });
      } catch (error) {
        toast.error(error);
      }
    } else {
      setWishListItems((prev) => [...prev, itemId]);
      try {
        const response = await WishListService.updateCart(
          { itemId, listName },
          token
        );

        toast.success(response.data.message, {
          position: 'bottom-right',
        });
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
        const foodsData = await FoodService.listFood();
        setFoodList(foodsData.data.data);

        const cartData = await CartService.getCart(token);
        setCartItems(cartData.data.cartData);

        const response = await WishListService.getAllData(token);
        const wishListData = response.data.data;
        wishListData.forEach((data) =>
          setWishListItems((prev) => [...prev, data.wishList])
        );
      } catch (error) {
        toast.error(error);
      }
      setIsFetching(false);
    };
    loadAllData();
  }, []);

  const value = {
    isFetching,
    foodList,
    cartItems,
    filterQuery,
    setFilterQuery,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    handlWishList,
    wishListItems,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
