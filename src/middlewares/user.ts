import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/User";
import { param, validationResult } from "express-validator";

// Extender la interfaz Request de Express usando module augmentation
declare module 'express-serve-static-core' {
    interface Request {
        reqUser: IUser;
    }
}

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    await param('email').isEmail().withMessage('El email no es valido').run(req);

    if(!validationResult(req).isEmpty()) {
        res.status(400).json({ message: 'El email no es valido' });
        return
    }
    next();
};

const emailExists = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    const user = await User.findOne({ email }).select('_id email username');
    if(!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return
    }
    req.reqUser = user;
    next();
};

const idExists = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const user = await User.findById({ userId }).select('_id email username');
    if(!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return
    }
    req.reqUser = user;
    next();
};

export { emailExists, validateEmail, idExists };