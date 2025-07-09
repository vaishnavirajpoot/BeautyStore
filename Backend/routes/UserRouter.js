import express from 'express';
import { Register,Login, isAuth, logout } from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';



const UserRouter = express.Router();

UserRouter.post("/register",Register)
UserRouter.post("/login",Login)
UserRouter.get("/is-auth",authUser,isAuth)
UserRouter.post("/logout",authUser,logout)

export default UserRouter;