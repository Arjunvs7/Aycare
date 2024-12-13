import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const navigate = useNavigate();

  const cartHasItems = all_product.some(e => cartItems[e.id] > 0);

  const incrementQuantity = (id) => {
    updateCartItemQuantity(id, cartItems[id] + 1);
  };

  const decrementQuantity = (id) => {
    if (cartItems[id] > 1) {
      updateCartItemQuantity(id, cartItems[id] - 1);
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login');
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {cartHasItems ? (
        all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="cartitems-format cartitems-format-main">
                  <img src={e.image} alt={e.name} className='carticon-product-icon' />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <div className="quantity-control">
                    <button 
                      className="quantity-btn decrement" 
                      onClick={() => decrementQuantity(e.id)}
                    >
                      -
                    </button>
                    <span className='cartitems-quantity'>{cartItems[e.id]}</span>
                    <button 
                      className="quantity-btn increment" 
                      onClick={() => incrementQuantity(e.id)}
                    >
                      +
                    </button>
                  </div>
                  <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                  <img 
                    src={remove_icon} 
                    onClick={() => removeFromCart(e.id)} 
                    alt="Remove from cart" 
                    className="remove-icon" 
                    aria-label="Remove item from cart"
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })
      ) : (
        <p>Your cart is empty.</p>
      )}

      {cartHasItems && (
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${getTotalCartAmount().toFixed(2)}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount().toFixed(2)}</h3>
              </div>
            </div>
            <div className="cartitems-buttons">
              <button 
                className="checkout-button" 
                onClick={handleCheckout}
              >
                PROCEED TO CHECKOUT
              </button>
              {/* <button 
                className="view-order-button" 
                onClick={() => setShowOrderDetails(!showOrderDetails)}
              >
                {showOrderDetails ? 'Hide Order Details' : 'View Order Details'}
              </button> */}
            </div>

            {showOrderDetails && (
              <div className="cartitems-order-details">
                <h2>Order Details</h2>
                <div className="order-items">
                  {all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                      return (
                        <div key={e.id} className="order-item">
                          <p>{e.name}</p>
                          <p>Quantity: {cartItems[e.id]}</p>
                          <p>Total: ${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>  
  );
};

export default CartItems;
