import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './CSS/Payment.css';
import { ShopContext } from '.././Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, cartItems = [] } = useContext(ShopContext); // Default cartItems to an empty array
  
  const [formData, setFormData] = useState({
    fullName: '',
    nickName: '',
    email: '',
    dateOfBirth: '',
    gender: 'male',
    paymentMethod: 'credit',
    cardNumber: '',
    cvc: '',
    expDate: '',
    totalAmount: 0,
  });

  // Set the total cart amount when the page loads or whenever cart data changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: getTotalCartAmount(),
    }));
  }, [getTotalCartAmount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = value;

    if (value.length >= 3 && value.length <= 4) {
      formattedValue = value.slice(0, 2) + '/' + value.slice(2);
    } else if (value.length >= 5) {
      formattedValue = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
    }

    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: formattedValue.slice(0, 10),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('cartItems:', cartItems);
    // try {
    //   // Ensure cartItems is an array before mapping
    //   const items = Array.isArray(cartItems)
    //     ? cartItems.map(item => ({
    //         productId: item.productId,
    //         quantity: item.quantity,
    //         price: item.price,
    //         totalAmount: item.quantity * item.price, // Calculate total amount for the item
    //       }))
    //     : [];

    //   // Send payment data and cart details to the backend API
    //   const response = await axios.post('http://localhost:4000/api/payments', {
    //     ...formData,
    //     items, // Include cart items data
    //   });

    try {
      const response = await axios.post('http://localhost:4000/api/payments', {
        ...formData,
        // cart: cartItems.map(item => ({
          cart: (Array.isArray(cartItems) ? cartItems : []).map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        totalAmount: getTotalCartAmount(),
      });


      if (response.data.message === 'Payment successfully processed') {
        alert('Payment Successful');
        navigate('/orders'); // Redirect to orders page after payment
      }
    } catch (error) {
      alert('Error saving payment details');
      console.error('Error:', error);
    }
  };

  return (
    <div className="wrapper">
      <h2>Payment Gateway</h2>
      <form onSubmit={handleSubmit}>
        <h4>Account</h4>
        <div className="input-group">
          <div className="input-box">
            <input
              className="name"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              className="name"
              type="text"
              name="nickName"
              placeholder="Nick Name"
              value={formData.nickName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-box">
            <input
              className="name"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-box">
            <h4>Date of Birth</h4>
            <input
              className="dob-single"
              type="text"
              name="dateOfBirth"
              placeholder="DD/MM/YYYY"
              value={formData.dateOfBirth}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="input-box">
            <h4>Gender</h4>
            <div className="radio-group">
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
                className="radio"
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
                className="radio"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div className="input-group">
          <div className="input-box">
            <h4>Payment Details</h4>
            <div className="radio-group">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                id="credit"
                checked={formData.paymentMethod === 'credit'}
                onChange={handleInputChange}
                className="radio"
              />
              <label htmlFor="credit">Credit Card</label>
              <input
                type="radio"
                name="paymentMethod"
                value="debit"
                id="debit"
                checked={formData.paymentMethod === 'debit'}
                onChange={handleInputChange}
                className="radio"
              />
              <label htmlFor="debit">Debit Card</label>
            </div>
          </div>
        </div>

        <div className="input-group">
          <div className="input-box">
            <input
              className="name"
              type="tel"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-box half-width">
            <input
              className="name"
              type="password"
              name="cvc"
              placeholder="CVC"
              value={formData.cvc}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box half-width">
            <input
              className="name"
              type="text"
              name="expDate"
              placeholder="EXP DATE"
              value={formData.expDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-box">
            <button type="submit">PAY NOW</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
