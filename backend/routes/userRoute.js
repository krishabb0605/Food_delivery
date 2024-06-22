import express from 'express';
import {
  loginUser,
  registerUser,
  sendVerificationEmail,
  verifyUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/verification', sendVerificationEmail);
userRouter.get('/verify-email/:token', verifyUser);

export default userRouter;
