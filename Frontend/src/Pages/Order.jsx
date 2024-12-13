import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';  // Assuming you are using ShopContext
import './CSS/Order.css';

export const Order = () => {
  const { all_product, cartItems, getTotalCartAmount } = useContext(ShopContext);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Check if the cart has items
  const cartHasItems = all_product.some(e => cartItems[e.id] > 0);

  return (
    <div className="order-page">
      <h2>Order Details</h2>
      
      {/* Show order details first */}
      {cartHasItems ? (
        <div className="order-items">
          {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={e.id} className="order-item">
                  <p><strong>{e.name}</strong></p>
                  <p>Quantity: {cartItems[e.id]}</p>
                  <p>Total: ${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Then show order summary */}
      {cartHasItems && (
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-totals">
            <div className="order-summary-item">
              <p className='subtotal'>Subtotal</p>
              <p className='gettotalamt'>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="order-summary-item">
              <p className='p1'>Shipping Fee</p>
              <p className='p1'>Free</p>
            </div>
            <hr />
            <div className="order-summary-item">
              <h3 className='total'>Total</h3>
              <h3 className='total'>${getTotalCartAmount().toFixed(2)}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
