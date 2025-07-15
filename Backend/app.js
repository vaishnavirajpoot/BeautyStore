import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js';
import 'dotenv/config';

import UserRouter from './routes/UserRouter.js';
import SellerRouter from './routes/SellerRouter.js';
import CloudinaryConnect from './config/Cloudinary.js';
import CartRouter from './routes/CartRouter.js';
import AddressRouter from './routes/AddressRouter.js';
import OrderRouter from './routes/OrderRouter.js';
import ProductRouter from './routes/ProductRoute.js';

const app = express();
const port = process.env.PORT || 3000;


const allowedOrigins = ['https://beauty-store-wygs.vercel.app'];


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};


app.use(cors(corsOptions)); // ← Always place before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


await ConnectDB();
await CloudinaryConnect();


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/seller", SellerRouter);
app.use("/api/cart", CartRouter);
app.use("/api/address", AddressRouter);
app.use("/api/order", OrderRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
