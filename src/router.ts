import { Router } from "express";
import authRouter from "./router/AuthRouter";
import userRouter from "./router/UserRouter";

const router = Router();


//TEST ROUTE
//TODO: REMOVE THIS ROUTE
router.get('/', (req,res) => {
    res.sendFile(process.cwd() + '/src/public/chat.html');
});

//USERS ROUTER
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;