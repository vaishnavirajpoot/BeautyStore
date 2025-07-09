
import express from 'express';
import { isSellerAuth, SellerLogin, SellerLogout } from '../controllers/SellerController.js';
import authSeller from '../middlewares/authSeller.js';


const SellerRouter = express.Router();


SellerRouter.post("/login",SellerLogin)
SellerRouter.get("/is-auth",authSeller,isSellerAuth)
SellerRouter.get("/logout",SellerLogout)

export default SellerRouter;
