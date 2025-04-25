const express = require('express');
const {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/OrderController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/', auth, placeOrder);
router.get('/', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.get('/admin/all', auth, role('admin'), getAllOrders);
router.put('/admin/:id', auth, role('admin'), updateOrderStatus);
module.exports = router;