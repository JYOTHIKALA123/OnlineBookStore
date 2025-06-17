import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderPage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const { bookId, title, price } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookId || !price || !title) {
      alert('Invalid book details. Please go back and try again.');
      return;
    }

    const total = quantity * price;

    try {
      await axios.post(
        'http://localhost:5000/api/orders',
        {
          books: [{ bookId, quantity }],
          total,
          shippingAddress
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('✅ Order placed successfully!');
      navigate('/my-orders');
    } catch (error) {
      console.error('Order placing failed:', error);
      alert('❌ Failed to place order.');
    }
  };

  const totalAmount = quantity * price;

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      {/* My Orders Button */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button
          onClick={() => navigate('/my-orders')}
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📄 My Orders
        </button>
      </div>

      <h2>📦 Place Your Order</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div>
          <label>📖 Book Title:</label>
          <input type="text" value={title || 'Not Available'} disabled />
        </div>

        <div>
          <label>📚 Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </div>

        <p><strong>💵 Price per Book:</strong> ₹{price}</p>
        <p><strong>💰 Total Amount:</strong> ₹{totalAmount}</p>

        <h3>🚚 Shipping Address</h3>
        <div>
          <label>Street:</label>
          <input type="text" name="street" value={shippingAddress.street} onChange={handleChange} required />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" value={shippingAddress.city} onChange={handleChange} required />
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="state" value={shippingAddress.state} onChange={handleChange} required />
        </div>
        <div>
          <label>ZIP Code:</label>
          <input type="text" name="zip" value={shippingAddress.zip} onChange={handleChange} required />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" name="country" value={shippingAddress.country} onChange={handleChange} required />
        </div>

        <button type="submit" style={{ marginTop: '15px', padding: '8px 12px' }}>
          ✅ Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
