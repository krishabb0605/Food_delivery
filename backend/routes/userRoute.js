import express from 'express';
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  sendVerificationEmail,
  signInWithGoogle,
  verifyUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/verification', sendVerificationEmail);
userRouter.get('/verify-email/:token', verifyUser);
userRouter.get('/forgot-password/:email', forgotPassword);
userRouter.post('/resetPassword', resetPassword);
userRouter.post('/google-login',signInWithGoogle)

export default userRouter;
