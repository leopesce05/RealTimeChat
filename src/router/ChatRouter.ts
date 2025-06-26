import { Router } from "express";
import { createChatHandler } from "../controllers/ChatController";
import { auth } from "../middlewares/auth";
import { body } from "express-validator";
import handleInputErrors from "../middlewares/handleInputErrors";

const chatRouter = Router();


chatRouter.post('/',
    auth,
    body('name').notEmpty().withMessage('El nombre es requerido').isLength({min: 3, max: 16}).withMessage('El nombre debe tener entre 3 y 16 caracteres'),
    body('type').isIn(['private', 'group']).withMessage('Los valores aceptables son private o group'),
    body('members').isArray().withMessage('Los miembros tienen que ser un arreglo'),
    body('members.*').isMongoId().withMessage('Los miembros tienen que ser un arreglo de ids de mongoDB'),
    handleInputErrors,
    createChatHandler
);

export default chatRouter;