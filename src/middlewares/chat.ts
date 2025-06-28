import { Request, Response, NextFunction } from "express";

import { isAdmin } from "../utils/role";
import { ChatMembership } from "../models/ChatMembership";
import {Chat, IChat} from "../models/Chat";

declare global {
    namespace Express {
        interface Request {
            chat: IChat;
        }
    }
}


export const validateChatOwner = async (req: Request, res: Response, next: NextFunction) => {
    const { chatId } = req.params;
    const user = req.user;

    const chatMembership = await ChatMembership.findOne({ chat: chatId, user: user._id });

    if(!chatMembership) {
        res.status(404).json({ message: 'No tienes permisos para acceder a este chat' });
        return
    }

    if(!isAdmin(chatMembership)) {
        res.status(403).json({ message: 'No tienes permisos para acceder a este chat' });
        return
    }

    next();

}

export const chatExists = async (req: Request, res: Response, next: NextFunction) => {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if(!chat) {
        res.status(404).json({ message: 'El chat no existe' });
        return
    }

    req.chat = chat;

    next();

}