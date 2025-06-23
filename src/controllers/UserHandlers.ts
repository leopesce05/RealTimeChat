import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import { Types } from "mongoose";

const getUser = async (req: Request, res: Response) => {
    const user = req.user;
    res.json(user);
}

const updateUsername = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { username } = req.body;
        user.username = username;
        await user.save();
        res.json(user);
    } catch (error) {
        res.json({ message: 'Error al actualizar el usuario' });
    }
}

const getContacts = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const contacts = await User.find(
            { _id: { $in: user.contacts } },
            { username: 1, email: 1 }
        );

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener contactos' });
    }
}

const addContact = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { paramId } = req.params;
        const paramObjectId = new Types.ObjectId(paramId);
        if(user._id.toString() === paramId) {
            res.json({ message: 'No puedes agregarte a ti mismo como contacto' });
            return;
        }

        if(user.contacts.includes(paramObjectId)) {
            res.status(400).json({ message: 'Ya tienes a este usuario como contacto' });
            return;
        }
        user.contacts.push(paramObjectId);
        await user.save();
        res.status(200).json({ message: 'Contacto agregado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar contacto' });
    }
    
}

const deleteContact = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { paramId } = req.params;
        const paramObjectId = new Types.ObjectId(paramId);

        if(user.contacts.includes(paramObjectId)) {
            user.contacts = user.contacts.filter(contact => !contact.equals(paramObjectId));
            await user.save();
            res.status(200).json({ message: 'Contacto eliminado correctamente' });
            return;
        }
        res.status(404).json({ message: 'Contacto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar contacto' });
    }
}

export { getUser, updateUsername, addContact, deleteContact, getContacts };