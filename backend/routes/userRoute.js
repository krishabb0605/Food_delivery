import express from 'express';
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  sendVerificationEmail,
  verifyUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/verification', sendVerificationEmail);
userRouter.get('/verify-email/:token', verifyUser);
userRouter.get('/forgotPassword/:email', forgotPassword);
userRouter.post('/resetPassword', resetPassword);

export default userRouter;
