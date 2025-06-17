const express = require('express');
const router = express.Router();
const {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks
} = require('../controllers/bookController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin-only routes
router.post('/', protect, adminOnly, addBook);
router.put('/:id', protect, adminOnly, updateBook);
router.delete('/:id', protect, adminOnly, deleteBook);

// Public or protected (as needed)
router.get('/', getAllBooks);

module.exports = router;
