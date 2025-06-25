import { Router } from "express";
import { body } from "express-validator";

import {auth} from "../middlewares/auth";
import handleInputErrors from "../middlewares/handleInputErrors";
import { getUser,updateUsername } from "../controllers/UserHandlers";

const userRouter = Router();


userRouter.get('/', 
    auth,
    getUser
);

userRouter.put('/', 
    auth,
    body('username').notEmpty().withMessage('El nombre no debe estar vacio'),
    handleInputErrors,
    updateUsername
);

export default userRouter;