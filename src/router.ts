import { Router } from "express";
import authRouter from "./router/AuthRouter";
import userRouter from "./router/UserRouter";

const router = Router();


//USERS ROUTER
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;