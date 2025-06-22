import jwt, { JwtPayload } from 'jsonwebtoken';


export const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};