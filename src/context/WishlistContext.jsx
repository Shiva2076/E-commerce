import React, { createContext, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.some(item => item.id === product.id);
      
      if (exists) {
        return prevItems;
      } else {
        return [...prevItems, product];
      }
    });
  };
  
  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };
  
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };
  
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};