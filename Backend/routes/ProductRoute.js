

import express from 'express';
import { upload } from '../config/Multer.js';
import authSeller from '../middlewares/authSeller.js';
import { AddProduct, ChangeProductStock, GetProduct, GetSingleProduct } from '../controllers/ProductController.js';

const ProductRouter = express.Router();

ProductRouter.post('/add',upload.array("images"),authSeller,AddProduct)

ProductRouter.get('/list', GetProduct);
ProductRouter.get('/id', GetSingleProduct);
ProductRouter.post('/stock',authSeller,ChangeProductStock);


export default ProductRouter;

