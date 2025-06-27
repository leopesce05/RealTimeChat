import { Router } from "express";
import { body } from "express-validator";

import {auth } from "../middlewares/auth";
import {validateEmail, emailExists } from "../middlewares/user";
import handleInputErrors from "../middlewares/handleInputErrors";
import { getUser,updateUsername, getUserByEmail } from "../controllers/UserController";

const userRouter = Router();

userRouter.param('email', validateEmail);
userRouter.param('email', emailExists);

//GET SELF USER
userRouter.get('/', 
    auth,
    getUser
);

//UPDATE SELF USER
userRouter.put('/', 
    auth,
    body('username').notEmpty().withMessage('El nombre no debe estar vacio'),
    handleInputErrors,
    updateUsername
);

//GET USER BY EMAIL
userRouter.get('/:email',
    auth,
    getUserByEmail
);


export default userRouter;