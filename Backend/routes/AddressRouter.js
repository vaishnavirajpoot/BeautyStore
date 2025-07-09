

import express from 'express';
import authUser from '../middlewares/authUser.js';
import { AddAddress, GetAddress } from '../controllers/AddressController.js';

const AddressRouter = express.Router();

AddressRouter.post('/add', authUser,AddAddress);
AddressRouter.get("/get",authUser,GetAddress);


export default AddressRouter;