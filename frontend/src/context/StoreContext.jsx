import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import {food_list} from "../assets/frontend_assets/assets"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://eatoid-backend.onrender.com/";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCount = (prev[itemId] || 0) - 1;
      if (newCount <= 0) {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
      return { ...prev, [itemId]: newCount };
    });
    if(token){
      await axios.post(url+"api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const itemInfo = food_list.find(
        (product) => product._id === (itemId)
      );
      if (!itemInfo) {
        console.warn(`Item with id ${itemId} not found in food list.`);
        return total;
      }
      const price = Number(itemInfo.price);
      return total + (isNaN(price) ? 0 : price * quantity);
    }, 0);
  };
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
  const loadCartData = async (token)=>{
    const response= await axios.post(url+"api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData);
  }


  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"));
          await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);


  // useEffect(()=>{
  //   console.log(food_list)
  // },[food_list])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
