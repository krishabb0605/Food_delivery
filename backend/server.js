import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import wishListRouter from './routes/wishListRoute.js';
import emailRouter from './routes/emailRoute.js';
import 'dotenv/config';

// App config
const app = express();
const port = process.env.PORT || 4001;

// middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API endpoint
app.use('/api/user', userRouter);
app.use('/api/email', emailRouter);
app.use('/api/orders', orderRouter);
app.use('/api/foods', foodRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlists', wishListRouter);
app.use('/api/categories', categoryRouter);

// for get image
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('API Working ...');
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
