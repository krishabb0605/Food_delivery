import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  getAllData,
  getWishList,
  handleWishList,
  removeList,
  renameListName,
} from '../controllers/wishListController.js';

const wishListRouter = express.Router();

wishListRouter.post('/update', authMiddleware, handleWishList);
wishListRouter.post('/get', authMiddleware, getWishList);
wishListRouter.post('/all', authMiddleware, getAllData);
wishListRouter.post('/rename', authMiddleware, renameListName);
wishListRouter.post('/remove', authMiddleware, removeList);

export default wishListRouter;
