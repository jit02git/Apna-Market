import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/ProductController.js';

import auth from '../middlewares/authMiddleware.js';
import role from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, role('admin'), createProduct);
router.put('/:id', auth, role('admin'), updateProduct);
router.delete('/:id', auth, role('admin'), deleteProduct);
module.exports = router;