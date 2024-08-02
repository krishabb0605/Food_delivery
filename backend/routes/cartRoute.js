import express from 'express';
import { getCart, updateCartData } from '../controllers/cartController.js';

import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.get('/', authMiddleware, getCart);
cartRouter.post('/', authMiddleware, updateCartData);

export default cartRouter;
