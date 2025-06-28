import { Router } from "express";
import { body } from "express-validator";

import { createChatHandler, addUserToChatHandler, addUsersToChatHandler, getChatHandler, getChatMembersHandler, getUserChatsHandler } from "../controllers/ChatController";
import { auth } from "../middlewares/auth";
import handleInputErrors from "../middlewares/handleInputErrors";
import { chatExists, validateChatOwner, validateChatMembership } from "../middlewares/chat";
import { idExists } from "../middlewares/user";

const chatRouter = Router();

chatRouter.use(auth);
chatRouter.param('chatId', chatExists);
chatRouter.param('chatId', validateChatMembership);

chatRouter.post('/',
    auth,
    body('name').optional().isLength({min: 3, max: 16}).withMessage('El nombre debe tener entre 3 y 16 caracteres'),
    body('type').isIn(['private', 'group']).withMessage('Los valores aceptables son private o group'),
    body('members').isArray().withMessage('Los miembros tienen que ser un arreglo'),
    body('members.*').isMongoId().withMessage('Los miembros tienen que ser un arreglo de ids de mongoDB'),
    handleInputErrors,
    createChatHandler
);

chatRouter.get('/',
    handleInputErrors,
    getUserChatsHandler
);

chatRouter.post('/member',
    body('userId').isMongoId().withMessage('El usuario no es valido'),
    body('chatId').isMongoId().withMessage('El chat no es valido'),
    handleInputErrors,
    chatExists,
    idExists,
    validateChatOwner,
    addUserToChatHandler
);

chatRouter.post('/members',
    body('users').isArray().withMessage('Los usuarios tienen que ser un arreglo'),
    body('users.*').isMongoId().withMessage('Los usuarios tienen que ser un arreglo de ids de mongoDB'),
    body('chatId').isMongoId().withMessage('El chat no es valido'),
    handleInputErrors,
    chatExists,
    validateChatOwner,
    addUsersToChatHandler
);

chatRouter.get('/members/:chatId',
    getChatMembersHandler
);

chatRouter.get('/:chatId',
    getChatHandler
);


//TODO: Get chat
//TODO: Update chat
//TODO: Delete chat
//TODO: Get chats
//TODO: Get chat members
//TODO: Remove chat member



export default chatRouter;