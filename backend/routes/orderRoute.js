import express from 'express';
import authMiddleWare from '../middleware/auth.js';
import {
  listOrder,
  placeOrder,
  updateStatus,
  usersOrder,
  verifyOrder,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleWare, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userOrders', authMiddleWare, usersOrder);
orderRouter.get('/list', listOrder);
orderRouter.post('/status', updateStatus);

export default orderRouter;
