const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/CartController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.delete('/:itemId', auth, removeFromCart);
router.delete('/', auth, clearCart);
module.exports = router;