import { Router } from "express";
import authRouter from "./router/AuthRouter";
import userRouter from "./router/UserRouter";
import chatRouter from "./router/ChatRouter";

const router = Router();


//TEST ROUTE
//TODO: REMOVE THIS ROUTE
router.get('/', (req,res) => {
    res.sendFile(process.cwd() + '/src/public/chat.html');
});

//USERS ROUTER
router.use('/auth', authRouter);
router.use('/user', userRouter);


//Chats Router
router.use('/chat', chatRouter);

export default router;