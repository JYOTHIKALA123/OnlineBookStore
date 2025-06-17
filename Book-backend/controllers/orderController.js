const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place order (from cart)
// Place order with direct JSON body
exports.placeOrder = async (req, res) => {
    try {
      const { books, total, shippingAddress } = req.body;
      const userId = req.user.id; // ensure protected route
  
      if (!books || books.length === 0) {
        return res.status(400).json({ message: 'Books list is required' });
      }
  
      const order = new Order({
        userId,
        books,
        total,
        shippingAddress
      });
  
      await order.save();
  
      res.status(201).json({
        message: 'Order placed successfully',
        order
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
// View all orders by customer
// View all orders by customer
exports.getOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }).populate('books.bookId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Cancel order
exports.cancelOrder = async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;

  try {
    const order = await Order.findOneAndDelete({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order canceled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View all customer orders (Admin only)
exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('userId', 'username email')
        .populate('books.bookId', 'title author price');
  
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // controllers/orderController.js

exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    try {
      // Find the order by id
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update only the status field
      order.status = status;
  
      // Save the order - only status changes, no validation error
      await order.save();
  
      res.json({ message: 'Order status updated', order });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Admin can delete any order by ID
  exports.adminDeleteOrder = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await Order.findByIdAndDelete(orderId);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      res.json({ message: 'Order deleted successfully by admin' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
