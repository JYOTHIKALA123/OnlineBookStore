const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  adminDeleteOrder
} = require('../controllers/orderController');

const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, placeOrder);
router.get('/', protect, getOrders);
router.delete('/:orderId', protect, cancelOrder);
router.get('/all', protect, admin, getAllOrders);
router.put('/:orderId/status', protect, admin, updateOrderStatus);
router.delete('/admin/:orderId', protect, admin, adminDeleteOrder);

module.exports = router;
