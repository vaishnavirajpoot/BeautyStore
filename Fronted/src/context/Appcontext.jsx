import { createContext, useContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../greencart_assets/assets";
import toast from "react-hot-toast";
export const AppContext = createContext();


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true; 


export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [products, setProducts] = useState([]);

  // fetch All products

const fetchProducts = async () => {
  try {
    const { data } = await axios.get('/api/product/list');

    if (data.success) {
      setProducts(data.products)
    } else {
      toast.error(data.message || "Failed to load products");
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};



// seller authentication check
const fetchSeller = async () => {
  try {
    const { data } = await axios.get("/api/seller/is-auth", {
      withCredentials: true,
    });

    if (data.success) {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  } catch (error) {
    setIsSeller(false);
  }
};

// fetch USer

const fetchUser = async()=>{
  try{
    const {data} = await axios.get('/api/user/is-auth')
    if(data.success){
setUser(data.user);
setCartItems(data.user.cartItems)
    }
  }catch(error){
setUser(null)
  }
}

  // Add products to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  // update cart items quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove product from Cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Remove from Cart");
    setCartItems(cartData);
  };

  // get cart item count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // get cart total Amount
const getCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    let itemInfo = products.find((product) => product._id === itemId);
    if (itemInfo) {
      let price = itemInfo.offerPrice || itemInfo.price || 0;
      totalAmount += price * cartItems[itemId];
    }
  }
  return Math.floor(totalAmount * 100) / 100;
};



  useEffect(() => {
    fetchUser()
    fetchSeller();
    fetchProducts();
  }, []);


  useEffect(()=>{
    const updateCart = async ()=>{
      try {
        const {data} = await axios.post('/api/cart/update',{cartItems})
        if(data.success){
          toast.success(data.message)
        }else{
          toast.success(data.message)
        }
      } catch (error) {
       toast.success(data.message)
      }
    }
  })

  const value = {
    searchQuery,
    setSearchQuery,
    updateCartItem,
    user,
    setUser,
    isSeller,
    addToCart,
    setIsSeller,
    navigate,
    products,
    currency,
    removeFromCart,
    cartItems,
    showUserLogin,
    setShowUserLogin,
    getCartAmount,
    getCartCount,
    axios,
     setCartItems,
    fetchProducts
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
