const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  books: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  status: { 
    type: String, 
    default: 'placed',
    enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
    lowercase: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);