import express from 'express';
import {
  loginUser,
  registerUser,
  signInWithGoogle,
  updatePassword,
  verifyUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/verify', verifyUser);
userRouter.post('/update', updatePassword);
userRouter.post('/google-login', signInWithGoogle);

export default userRouter;
