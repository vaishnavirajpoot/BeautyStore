import express from "express";
import { UpdateCart } from "../controllers/CartController.js";
import authUser from "../middlewares/authUser.js";

const CartRouter = express.Router();

CartRouter.post("/update", authUser, UpdateCart);

export default CartRouter;
