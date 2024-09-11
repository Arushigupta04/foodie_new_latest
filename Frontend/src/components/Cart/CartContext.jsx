import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      };
      setCartItems(updatedCart);
      toast.info(`${item.item_title} quantity increased`); // Show toast for increasing quantity
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      toast.success(`${item.item_title} added to cart`); // Show toast for adding new item
    }
  };

  const removeItemFromCart = (itemId) => {
    const itemToRemove = cartItems.find((item) => item._id === itemId);
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    toast.error(`${itemToRemove.item_title} removed from cart`); // Show toast for removing item
  };

  const increaseItemQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    toast.info('Item quantity increased'); // Show toast for increasing quantity
  };

  const decreaseItemQuantity = (itemId) => {
    const itemToDecrease = cartItems.find((item) => item._id === itemId);
  
    if (itemToDecrease.quantity > 1) {
      const updatedCart = cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCart);
      toast.info('Item quantity decreased'); // Show toast for decreasing quantity
    } else {
      toast.warning('Item quantity cannot be reduced further'); // Show toast when quantity is 1
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared'); // Show toast for clearing cart
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
