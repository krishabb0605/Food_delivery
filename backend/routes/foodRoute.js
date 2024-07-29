import express from 'express';
import {
  addFood,
  listFood,
  removeFood,
  updateFood,
} from '../controllers/foodController.js';

// we can create image storage system
import multer from 'multer';

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// send the data to server use post request
foodRouter.get('/', listFood);
foodRouter.post('/', upload.single('image'), addFood);
foodRouter.post('/:id', upload.single('image'), updateFood);
foodRouter.delete('/:id', removeFood);

export default foodRouter;
