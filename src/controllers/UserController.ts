import { Request, Response } from "express";
import { User } from "../models/User";
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

export { getUser, updateUsername };