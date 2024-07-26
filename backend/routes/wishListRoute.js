import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  getAllData,
  getWishList,
  handleWishList,
} from '../controllers/wishListController.js';

const wishListRouter = express.Router();

wishListRouter.post('/update', authMiddleware, handleWishList);
wishListRouter.post('/get', authMiddleware, getWishList);
wishListRouter.post('/all', authMiddleware, getAllData);

export default wishListRouter;
