import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from '../controllers/OrderController.js';

import auth from '../middlewares/authMiddleware.js';
import role from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', auth, placeOrder);
router.get('/', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.get('/admin/all', auth, role('admin'), getAllOrders);
router.put('/admin/:id', auth, role('admin'), updateOrderStatus);
module.exports = router;