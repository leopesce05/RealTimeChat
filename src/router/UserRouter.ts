import { Router } from "express";
import { body } from "express-validator";

import {auth} from "../middlewares/auth";
import handleInputErrors from "../middlewares/handleInputErrors";
import { validateEmail, validateEmailExists } from "../middlewares/user";
import { getUser,updateUsername,addContact,deleteContact, getContacts } from "../controllers/UserHandlers";

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

userRouter.get('/contact', 
    auth,
    getContacts
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