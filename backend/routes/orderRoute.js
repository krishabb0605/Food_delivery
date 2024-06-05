import express from 'express';
import authMiddleWare from '../middleware/auth.js';
import {
  placeOrder,
  usersOrder,
  verifyOrder,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleWare, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userOrders', authMiddleWare, usersOrder);

export default orderRouter;
