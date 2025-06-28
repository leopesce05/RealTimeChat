import { Router } from "express";
import { body } from "express-validator";

import { createChatHandler, addUserToChatHandler } from "../controllers/ChatController";
import { auth } from "../middlewares/auth";
import handleInputErrors from "../middlewares/handleInputErrors";
import { chatExists, validateChatOwner } from "../middlewares/chat";
import { idExists } from "../middlewares/user";

const chatRouter = Router();


chatRouter.post('/',
    auth,
    body('name').optional().isLength({min: 3, max: 16}).withMessage('El nombre debe tener entre 3 y 16 caracteres'),
    body('type').isIn(['private', 'group']).withMessage('Los valores aceptables son private o group'),
    body('members').isArray().withMessage('Los miembros tienen que ser un arreglo'),
    body('members.*').isMongoId().withMessage('Los miembros tienen que ser un arreglo de ids de mongoDB'),
    handleInputErrors,
    createChatHandler
);

chatRouter.post('/member',
    auth,
    body('userId').isMongoId().withMessage('El usuario no es valido'),
    body('chatId').isMongoId().withMessage('El chat no es valido'),
    handleInputErrors,
    chatExists,
    idExists,
    validateChatOwner,
    addUserToChatHandler
);

chatRouter.post('/members',
    auth,
    body('users').isArray().withMessage('Los usuarios tienen que ser un arreglo'),
    body('users.*').isMongoId().withMessage('Los usuarios tienen que ser un arreglo de ids de mongoDB'),
    body('chatId').isMongoId().withMessage('El chat no es valido'),
    handleInputErrors,
    chatExists,
    validateChatOwner,
    addUsersToChatHandler
);
//TODO: Get chat
//TODO: Update chat
//TODO: Delete chat
//TODO: Get chats
//TODO: Get chat members
//TODO: Remove chat member



export default chatRouter;