import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products,setProducts] = useState([]);
  
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch('https://ecommerce-back-end-2.onrender.com/allproducts') 
          .then((res) => res.json()) 
          .then((data) => setProducts(data))

    if(localStorage.getItem("auth-token"))
    {
      fetch('https://ecommerce-back-end-2.onrender.com/getcart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {setCartItems(data)});
    }

  }, [])
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem("auth-token"))
    {
      fetch('https://ecommerce-back-end-2.onrender.com/addtocart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({"itemId":itemId}),
    })
      .then((resp) => resp.json())
      .then((data) => {console.log(data)});
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem("auth-token"))
    {
      fetch('https://ecommerce-back-end-2.onrender.com/removefromcart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({"itemId":itemId}),
    })
      .then((resp) => resp.json())
      .then((data) => {console.log(data)});
    }
  };

  const incrementQuantity = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const decrementQuantity = (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount, incrementQuantity, decrementQuantity, clearCart };
  
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
