import { Router } from "express";
import { body } from "express-validator";
import  handleInputErrors  from "../middlewares/handleInputErrors";
import { createAccount, login } from "../handlers/AuthHandlers";

const authRouter = Router();

authRouter.post('/register', 
    // Agregar las validaciones como middleware
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('username').notEmpty().withMessage('El nombre no debe estar vacio'),
    body('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors,
    createAccount
)

authRouter.post('/login',
    [
        body('email').isEmail().withMessage('E-mail inválido'),
        body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    ],
    handleInputErrors,
    login
)


export default authRouter;