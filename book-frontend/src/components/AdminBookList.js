import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminBookList.css';

const AdminBookList = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Book deleted successfully');
        fetchBooks(); // Refresh
      } catch (err) {
        alert('Error deleting book');
      }
    }
  };

  const handleEditClick = (book) => {
    setEditBook(book);
  };

  const handleEditChange = (e) => {
    setEditBook({ ...editBook, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/books/${editBook._id}`, editBook, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Book updated successfully');
      setEditBook(null);
      fetchBooks(); // Refresh
    } catch (err) {
      alert('Error updating book');
    }
  };

  // Navigate to orders page
  const viewOrders = () => {
    navigate('/admin/orders');
  };

  return (
    <div className="admin-book-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📚 Manage Books</h2>
        <button 
          onClick={viewOrders} 
          style={{ padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          View All Orders
        </button>
      </div>

      {editBook && (
        <form onSubmit={handleUpdate} className="edit-book-form">
          <h3>Edit Book</h3>
          <input type="text" name="title" value={editBook.title} onChange={handleEditChange} required />
          <input type="text" name="author" value={editBook.author} onChange={handleEditChange} required />
          <input type="number" name="price" value={editBook.price} onChange={handleEditChange} required />
          <input type="text" name="image" value={editBook.image} onChange={handleEditChange} required />
          <input type="number" name="stock" value={editBook.stock} onChange={handleEditChange} required />
          <textarea name="description" value={editBook.description} onChange={handleEditChange} required />
          <button type="submit">Update Book</button>
          <button type="button" onClick={() => setEditBook(null)}>Cancel</button>
        </form>
      )}

      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>👨‍💼 {book.author}</p>
            <p>💰 ₹{book.price}</p>
            <p>📦 {book.stock} in stock</p>
            <button onClick={() => handleEditClick(book)}>✏️ Edit</button>
            <button onClick={() => handleDelete(book._id)}>🗑️ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookList;
