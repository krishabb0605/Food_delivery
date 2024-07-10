import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import categoryRouter from './routes/categoryRoute.js';
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
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);

// for get image
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('API Working ...');
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
