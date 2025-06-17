import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddBook.css';

const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    image: '',
    stock: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/books', book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('✅ Book added successfully!');
      setBook({
        title: '',
        author: '',
        price: '',
        description: '',
        image: '',
        stock: ''
      });

      // Redirect to AdminBookList page
      navigate('/admin/book-list');
    } catch (err) {
      alert(err.response?.data?.message || '❌ Error adding book');
    }
  };

  return (
    <div className="add-book-container" style={{ position: 'relative', padding: '20px' }}>
      {/* Top-right Update Book List Button */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button
          onClick={() => navigate('/admin/book-list')}
          style={{
            padding: '8px 12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          📚 Update Book List
        </button>
      </div>

      <h2 style={{ marginTop: '60px' }}>Add New Book</h2>

      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={book.image}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={book.stock}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          required
        />
        <button type="submit">➕ Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
