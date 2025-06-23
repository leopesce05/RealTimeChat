import { Router } from "express";
import auth from "../middlewares/auth";
import { getUser,updateUsername,addContact,deleteContact } from "../controllers/UserHandlers";
import { body } from "express-validator";
import handleInputErrors from "../middlewares/handleInputErrors";
import { validateEmail, validateEmailExists } from "../middlewares/user";

const userRouter = Router();

userRouter.param('email', validateEmail);
userRouter.param('email', validateEmailExists);


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

userRouter.post('/contact/:email', 
    auth,
    addContact
);

userRouter.delete('/contact/:email', 
    auth,
    deleteContact
);

export default userRouter;