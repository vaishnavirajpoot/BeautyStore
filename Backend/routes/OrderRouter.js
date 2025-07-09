import express from 'express';
import { GetAllOrder, GetOrderById, placeOrderByCOD ,placeOrderBySTRIPE} from '../controllers/OrderController.js';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

const OrderRouter = express.Router();

OrderRouter.post('/cod',authUser,placeOrderByCOD)
OrderRouter.get("/user",authUser,GetOrderById);
OrderRouter.get('/seller',authSeller,GetAllOrder);
OrderRouter.post('/stripe',authUser,placeOrderBySTRIPE)


export default OrderRouter;