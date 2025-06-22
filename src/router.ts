import { Router } from "express";
import authRouter from "./router/AuthRouter";

const router = Router();


//USERS ROUTER
router.use('/auth', authRouter);

export default router;