import express from 'express';
import {
  getData,
  loginUser,
  registerUser,
  signInWithGoogle,
  updatePassword,
  updateProfileData,
  verifyUser,
} from '../controllers/userController.js';
import multer from 'multer';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

userRouter.get('/', authMiddleware, getData);
userRouter.post('/', upload.single('image'), updateProfileData);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/verify', verifyUser);
userRouter.post('/update', updatePassword);
userRouter.post('/google-login', signInWithGoogle);

export default userRouter;
