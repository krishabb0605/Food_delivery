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
  let [wishListItems, setWishListItems] = useState({});

  const [wishListName, setWishListName] = useState([]);

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
    const arrayForWishList = wishListItems[listName]
      ? [...wishListItems[listName]]
      : [];

    if (!wishListName.includes(listName)) {
      setWishListName([...wishListName, listName]);
    }

    if (arrayForWishList.includes(itemId)) {
      arrayForWishList.splice(arrayForWishList.indexOf(itemId), 1);
    } else {
      arrayForWishList.push(itemId);
    }

    setWishListItems((prev) => ({
      ...prev,
      [listName]: arrayForWishList,
    }));

    try {
      const response = await WishListService.updateWishList(
        { itemId, listName },
        token
      );
      const message = response.data.message;

      message.includes('add')
        ? toast.success(message, {
            position: 'bottom-center',
            autoClose: 1000,
          })
        : toast.error(message, {
            position: 'bottom-center',
            autoClose: 1000,
          });
    } catch (error) {
      toast.error(error);
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

        const newData = {};
        wishListData.forEach(({ listName, wishList }) => {
          newData[listName] = wishList;
        });
        setWishListItems(newData);

        wishListData.forEach((data) =>
          setWishListName((prev) => [...prev, data.listName])
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
    wishListName,
    setWishListName,
    setWishListItems,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
