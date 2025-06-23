import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { IUser, User } from "../models/User";
import { Socket } from "socket.io";
import colors from 'colors';

// Extender la interfaz Request de Express usando module augmentation
declare module 'express-serve-static-core' {
    interface Request {
        user: IUser;
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

// Extend Socket interface to include user data
declare module 'socket.io' {
    interface Socket {
        user: IUser;
    }
}

// Socket.IO authentication middleware
const ioAuth = async (socket: Socket, next: (err?: Error) => void) => {
    try {
        // Get token from handshake auth or query
        let token = socket.handshake.auth.token;
        token = token.split(' ')[1];

        if (!token) {
            console.log(colors.red(`🔒 Socket ${socket.id}: No token provided`));
            return next(new Error('Authentication token required'));
        }

        // Verify JWT token
        const payload = verifyToken(token);
        if (!payload || !payload['id']) {
            console.log(colors.red(`❌ Socket ${socket.id}: Invalid token`));
            return next(new Error('Invalid authentication token'));
        }

        // Get user from database
        const user= await User.findById(payload['id']);
        if (!user) {
            console.log(colors.red(`❌ Socket ${socket.id}: User not found`));
            return next(new Error('User not found'));
        }

        // Attach user data to socket
        socket.user = user;

        console.log(colors.green(`🔐 Socket ${socket.id}: Authenticated as ${user.username}`));
        next();

    } catch (error) {
        console.log(colors.red(`❌ Socket ${socket.id}: Authentication failed`));
        next(new Error('Authentication failed'));
    }
};

export { auth, ioAuth };