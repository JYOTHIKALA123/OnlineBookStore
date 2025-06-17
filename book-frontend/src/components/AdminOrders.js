import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    if (!token) {
      alert('Please login first.');
      return;
    }
    try {
      const res = await axios.get('http://localhost:5000/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      alert('Failed to fetch orders.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleDeleteOrder = async (orderId) => {
    if (!orderId) {
      alert('Invalid order ID');
      return;
    }
    if (!token) {
      alert('Please login first.');
      return;
    }
    if (window.confirm('Are you sure to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/admin/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Order deleted successfully');
        fetchOrders();
      } catch (err) {
        alert('Error deleting order');
      }
    }
  };

  return (
    <div className="admin-orders">
      <h2>📦 All Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Books (Title & Qty)</th>
            <th>Total Price</th>
            <th>Shipping Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId?.username || 'N/A'}</td>
                <td>
                  {order.books && order.books.length > 0
                    ? order.books.map((book, idx) => (
                        <div key={idx}>
                          {book.bookId?.title || 'Untitled'} (x{book.quantity})
                        </div>
                      ))
                    : 'N/A'}
                </td>
                <td>₹{order.total || 'N/A'}</td>
                <td>
                  {order.shippingAddress
                    ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.zip}`
                    : 'N/A'}
                </td>
                <td>{order.status || 'Pending'}</td>
                <td>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
