import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { IUser, User } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}


const auth = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    token = token.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    if(payload['id']) {
        const user = await User.findById(payload['id']);
        if(!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        req.user = user;
        next();
    }
};

export default auth;