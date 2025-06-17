import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove item from cart handler
  const removeFromCart = async (bookId) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/cart/remove',
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Remove response:', res.data);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.bookId?._id !== bookId)
      );
    } catch (err) {
      console.error('Error removing item:', err.response ? err.response.data : err.message);
      alert('Failed to remove item from cart');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {cartItems.map((item) =>
            item.bookId ? (
              <div
                key={item._id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '15px',
                  width: '280px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <img
                  src={item.bookId.image}
                  alt={item.bookId.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <h3>{item.bookId.title}</h3>
                <p><strong>Author:</strong> {item.bookId.author}</p>
                <p><strong>Description:</strong> {item.bookId.description}</p>
                <p><strong>Price:</strong> ₹{item.bookId.price}</p>
                <p><strong>Stock:</strong> {item.bookId.stock}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>

                <button
                  style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                  onClick={() => removeFromCart(item.bookId._id)}
                >
                  Remove
                </button>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
