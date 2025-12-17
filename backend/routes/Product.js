import express from 'express';
import { createProduct, updateProduct , getProducts , deleteProduct } from '../controller/Product.js';

const router = express.Router();

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.get('/', getProducts);

router.put('/:id', updateProduct);

export default router;
