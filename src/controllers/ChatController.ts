import { Request, Response } from "express";
import { Chat } from "../models/Chat";
import { ChatMembership } from "../models/ChatMembership";
import { User } from "../models/User";


export const createChatHandler = async (req: Request, res: Response) => {
    const { name, type, members } = req.body;
    const adminId = req.user._id.toString();

    try {
        //Eliminar el admin de los mebmbers si es que esta
        const filteredMembers = members.filter(member => member.toString() !== adminId);

        //Check if chat type is private and has more than 1 member
        if(type === 'private' && filteredMembers.length > 1) {
            res.status(400).json({ error: 'El chat privado no puede tener mas de dos miembros' });
            return
        }

        if(type === 'group' && !name) {
            res.status(400).json({ error: 'El nombre es obligatorio para chats grupales' });
            return
        }
        
        // For private chats, name is not required
        const chatData = type === 'private' ? { type } : { name, type };


        const chat = await Chat.create(chatData);

        if(!chat) {
            res.status(400).json({ error: 'Error al crear el chat' });
            return
        }

        try{
            //ADD ADMIN TO CHAT
            await addUserToChat(chat._id.toString(), adminId, 'admin');

            //ADD USERS TO CHAT
            await addUsersToChat(chat._id.toString(), filteredMembers);
        }catch(e) {
            res.status(400).json({ error: e.message });
            return
        }

        res.status(201).json(chat);
        return
    }catch(e) {
        res.status(500).json({ error: e.message });
        return
    }
    
}








//FUNCIONES PARA HANDLERS

const addUserToChat = async (chatId: string, userId: string, role: 'admin' | 'member') => {
    //Check if chat exists
    const chat = await Chat.findById(chatId);

    if (!chat) {
        throw new Error('Chat not found');
    }
    //Check if user exists
    const user = await User.findById(userId);

    if(!user) {
        throw new Error('Usuario no encontrado');
    }

    //Check if user is already in chat
    const actualUsers = await ChatMembership.find({ chat: chatId });

    if(actualUsers.some(user => user.user.toString() === userId)) {
        throw new Error('El usuario ya esta en el chat');
    }
    
    //If chat is private, dont add more than 1 member
    if(chat.type === 'private' && actualUsers.length > 1) {
        throw new Error('El chat privado no puede tener mas de un miembro');
    }

    //Add user to chat
    await ChatMembership.create({ user: userId, chat: chatId, role });

}

const addUsersToChat = async (chatId: string, userIds: string[]) => {
    const promises = userIds.map(async (userId) => {
        try {
            await addUserToChat(chatId, userId, 'member');
            return { userId, success: true };
        } catch (error) {
            return { userId, success: false, error: error.message };
        }
    });

    const results = await Promise.all(promises);

    return results;
}