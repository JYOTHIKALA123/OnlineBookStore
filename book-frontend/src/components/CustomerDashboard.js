import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CustomerDashboard.css';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };
    fetchBooks();
  }, []);

  // Add to cart using API
  const addToCart = async (bookId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('🛒 Book added to cart');
    } catch (err) {
      console.error('Add to cart failed:', err);
      alert('❌ Failed to add to cart');
    }
  };

  // Redirect to Order Page with book info
  const orderBook = (book) => {
    navigate('/order', {
      state: {
        bookId: book._id,
        title: book.title,
        price: book.price
      }
    });
  };

  // Navigate to cart page
  const goToCartPage = () => {
    navigate('/cart');
  };

  return (
    <div className="customer-dashboard">
      <div className="cart-toggle" onClick={goToCartPage}>
        🛒 Cart Items
      </div>

      <h2>📚 Available Books</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ₹{book.price}</p>
            <button onClick={() => addToCart(book._id)}>Add to Cart</button>
            <button onClick={() => orderBook(book)}>Order Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
