import express from 'express';
import {
  forgotPassword,
  sendVerificationEmail,
} from '../controllers/emailController.js';

const emailRouter = express.Router();

emailRouter.post('/verification', sendVerificationEmail);
emailRouter.post('/forgot-password', forgotPassword);

export default emailRouter;
