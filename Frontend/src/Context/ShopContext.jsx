// import React, { createContext, useState, useEffect } from 'react';

// export const ShopContext = createContext(null);

// // Helper function to get the default cart items from localStorage
// const getDefaultCart = () => {
//   const savedCart = localStorage.getItem("cartItems");
//   if (savedCart) {
//     return JSON.parse(savedCart);
//   } else {
//     let cart = {};
//     for (let index = 0; index <= 300; index++) {
//       cart[index] = 0;
//     }
//     return cart;
//   }
// };

// const ShopContextProvider = (props) => {
//   const [all_product, setAll_Product] = useState([]);
//   const [cartItems, setCartItems] = useState(getDefaultCart());

//   // Fetch products from the API
//   useEffect(() => {
//     fetch('http://localhost:4000/allproducts')
//       .then((response) => response.json())
//       .then((data) => setAll_Product(data));
//   }, []);

//   // Save cartItems to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Function to add an item to the cart
//   const addToCart = (itemId) => {
//     console.log(`Adding item with ID: ${itemId}`);
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] + 1,
//     }));
//   };

//   // Function to remove an item from the cart
//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: Math.max(prev[itemId] - 1, 0),
//     }));
//   };

//   // Function to update the quantity of an item in the cart
//   const updateCartItemQuantity = (itemId, quantity) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: quantity,
//     }));
//   };

//   // Function to get the total amount of the cart
//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = all_product.find((product) => product.id === Number(item));
//         if (itemInfo) {
//           totalAmount += itemInfo.new_price * cartItems[item];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   // Function to get the total number of items in the cart
//   const getTotalCartItems = () => {
//     let totalItem = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         totalItem += cartItems[item];
//       }
//     }
//     return totalItem;
//   };

//   // Function to clear the cart items
//   const clearCart = () => {
//     setCartItems({});
//     localStorage.removeItem("cartItems"); // Clear cart from localStorage as well
//   };

//   const contextValue = {
//     getTotalCartItems,
//     getTotalCartAmount,
//     all_product,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateCartItemQuantity,
//     clearCart, // Add clearCart function to the context
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;
import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

// Helper function to get the default cart items from localStorage
const getDefaultCart = () => {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    return JSON.parse(savedCart);
  } else {
    let cart = {};
    return cart;
  }
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Fetch products from the API
  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setAll_Product(data));
  }, []);

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (itemId) => {
    console.log('Adding to cart:', itemId); // Debugging log
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Safely increment the quantity
    }));
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 0),
    }));
  };

  // Function to update the quantity of an item in the cart
  const updateCartItemQuantity = (itemId, quantity) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  // Function to get the total amount of the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Function to get the total number of items in the cart
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  // Function to clear the cart items
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems"); // Clear cart from localStorage as well
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart, // Add clearCart function to the context
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
