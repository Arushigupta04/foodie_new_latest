import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['cart']);
  const [cartItems, setCartItems] = useState(cookies.cart || []);

  useEffect(() => {
    setCookie('cart', cartItems, { path: '/' });
  }, [cartItems, setCookie]);

  const addItemToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      const updatedQuantity = updatedCart[existingItemIndex].quantity + 1;

      if (updatedQuantity > 30) {
        toast.warning('No more items can be added');
      } else {
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedQuantity,
        };
        setCartItems(updatedCart);
        toast.info(`${item.item_title} quantity increased`);
      }
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      toast.success(`${item.item_title} added to cart`);
    }
  };

  const removeItemFromCart = (itemId) => {
    const itemToRemove = cartItems.find((item) => item._id === itemId);
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    if (itemToRemove) {
      toast.error(`${itemToRemove.item_title} removed from cart`);
    }
  };

  const increaseItemQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: Math.min(item.quantity + 1, 30) } : item
    );

    const item = updatedCart.find((item) => item._id === itemId);
    setCartItems(updatedCart);
    
    if (item.quantity === 30) {
      toast.warning('No more items can be added');
    } else {
      toast.info('Item quantity increased');
    }
  };

  const decreaseItemQuantity = (itemId) => {
    const itemToDecrease = cartItems.find((item) => item._id === itemId);

    if (itemToDecrease) {
      if (itemToDecrease.quantity > 1) {
        const updatedCart = cartItems.map((item) =>
          item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCart);
        toast.info('Item quantity decreased');
      } else {
        removeItemFromCart(itemId);
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
