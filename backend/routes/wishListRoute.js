import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  deleteList,
  getAllData,
  handleWishList,
  updateListName,
} from '../controllers/wishListController.js';

const wishListRouter = express.Router();

wishListRouter.get('/', authMiddleware, getAllData);
wishListRouter.post('/', authMiddleware, handleWishList);
wishListRouter.post('/update', authMiddleware, updateListName);
wishListRouter.delete('/:list', authMiddleware, deleteList);

export default wishListRouter;
