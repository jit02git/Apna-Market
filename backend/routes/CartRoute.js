import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from '../controllers/CartController.js';

import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.delete('/:itemId', auth, removeFromCart);
router.delete('/', auth, clearCart);
module.exports = router;