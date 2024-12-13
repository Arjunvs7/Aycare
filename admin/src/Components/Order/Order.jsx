// import React, { useState, useEffect } from 'react';
// import './Order.css';

// const OrderDetails = () => {
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     // Simulating fetching order data (you can replace with real API call)
//     const fetchOrderData = async () => {
//       const orderData = {
//         fullName: "",  // Cleared value
//         email: "",     // Cleared value
//         items: [       // Cleared items
//           { productId: "", quantity: 0, price: 0 }, // Cleared values
//           { productId: "", quantity: 0, price: 0 }, // Cleared values
//         ]
//       };
//       setOrder(orderData);
//     };

//     fetchOrderData();
//   }, []);

//   if (!order) {
//     return <div>Loading order details...</div>;
//   }

//   const totalAmount = order.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

//   return (
//     <div className="order-container">
//       <div className="order-details">
//         <h2>Order for {order.fullName || 'N/A'}</h2>
//         <p>Email: {order.email || 'N/A'}</p>
//       </div>
//       <div className="order-items">
//         <h3>Order Items</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Product ID</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {order.items.map((item, index) => {
//               const itemTotal = item.quantity * item.price;
//               return (
//                 <tr key={index}>
//                   <td>{item.productId || 'N/A'}</td>
//                   <td>{item.quantity || 0}</td>
//                   <td>${item.price || 0}</td>
//                   <td>${itemTotal || 0}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       <div className="total-amount">
//         <p>Total Amount: ${totalAmount || 0}</p>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;
// Order.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch payment data from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/payments');
        setOrders(response.data); // Store fetched data in state
      } catch (error) {
        setError('Error fetching order data');
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h2>Order Records</h2>
      {error && <p className="error">{error}</p>}
      <table className="order-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>TAmount</th>
            <th>Payment </th>
            <th>Date of pay</th>
            <th>Items</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.fullName}</td>
              <td>{order.email}</td>
              <td>
                {typeof order.totalAmount === 'number'
                  ? `$${order.totalAmount.toFixed(2)}`
                  : 'N/A'}
              </td>
              <td>{order.paymentMethod}</td>
              <td>{order.dateOfBirth}</td>
              <td>
                <ul>
                  {order.cart && order.cart.length > 0 ? (
                    order.cart.map((item, index) => (
                      <li key={index}>
                        Product ID: {item.productId} - Quantity: {item.quantity}
                      </li>
                    ))
                  ) : (
                    <li>No items</li>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
