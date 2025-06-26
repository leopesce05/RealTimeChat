import { Request, Response } from "express";
import { User } from "../models/User";
import { hashPassword, comparePassword } from "../utils/auth";
import {generateToken} from '../utils/jwt';

export const createAccount = async (req : Request, res : Response) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error('Un usuario con ese mail ya esta registrado')
            res.status(409).json({ error: error.message })
            return
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ user });
        return

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
        return
    }
}

export const login = async (req : Request, res : Response) =>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ error: 'Usuario no encontrado' });
            return
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            res.status(400).json({ error: 'Contraseña incorrecta' });
            return
        }

        const token = generateToken({ id: user._id });

        res.status(200).json({ token });
        return

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
        return
    }
}

