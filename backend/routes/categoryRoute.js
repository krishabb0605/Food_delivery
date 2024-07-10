import express from 'express';
import {
  addCategory,
  listCategory,
  removeCateogry,
} from '../controllers/categoryController.js';
import multer from 'multer';

const categoryRouter = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

categoryRouter.post('/add', upload.single('image'), addCategory);
categoryRouter.get('/list', listCategory);
categoryRouter.post('/remove', removeCateogry);

export default categoryRouter;
