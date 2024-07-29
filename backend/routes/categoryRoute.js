import express from 'express';
import {
  addCategory,
  listCategory,
  removeCateogry,
  updateCateogry,
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

categoryRouter.get('/', listCategory);
categoryRouter.post('/', upload.single('image'), addCategory);
categoryRouter.post('/:id', upload.single('image'), updateCateogry);
categoryRouter.delete('/:id', removeCateogry);

export default categoryRouter;
