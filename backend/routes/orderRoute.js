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

orderRouter.get('/', listOrder);
orderRouter.get('/order', authMiddleWare, usersOrder);
orderRouter.post('/', authMiddleWare, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/status', updateStatus);

export default orderRouter;
