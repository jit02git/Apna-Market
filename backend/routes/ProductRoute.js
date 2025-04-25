const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, role('admin'), createProduct);
router.put('/:id', auth, role('admin'), updateProduct);
router.delete('/:id', auth, role('admin'), deleteProduct);
module.exports = router;