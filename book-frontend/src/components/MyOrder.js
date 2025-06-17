import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch orders', err);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmCancel) return;
  
    try {
      await axios.delete(
        `http://localhost:5000/api/orders/${orderId}`,  // DELETE request here
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('🗑️ Order canceled successfully');
      fetchOrders(); // Refresh orders after cancellation
    } catch (err) {
      console.error('❌ Error canceling order:', err);
      alert(err.response?.data?.message || 'Failed to cancel order');
    }
  };
  

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading orders...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              position: 'relative',
              backgroundColor: '#f9f9f9',
            }}
          >
            <p><strong>🆔 Order ID:</strong> {order._id}</p>
            <p><strong>🕒 Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p>
              <strong>📦 Status:</strong> 
              <span style={{ 
                color: order.status === 'cancelled' ? 'red' : 
                      order.status === 'delivered' ? 'green' : 'orange',
                fontWeight: 'bold',
                marginLeft: '5px'
              }}>
                {order.status.toUpperCase()}
              </span>
            </p>

            <p><strong>📚 Books:</strong></p>
            <ul>
              {order.books.map((b, index) => (
                <li key={index}>
                  {b.bookId?.title || 'Deleted Book'} - Quantity: {b.quantity}
                </li>
              ))}
            </ul>

            <p><strong>💰 Total:</strong> ₹{order.total}</p>
            <p>
              <strong>🏠 Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}, {order.shippingAddress.country}
            </p>

            {(order.status === 'placed' || order.status === 'processing') && (
              <button
                onClick={() => cancelOrder(order._id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  ':hover': {
                    backgroundColor: '#c0392b'
                  }
                }}
              >
                🗑️ Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;