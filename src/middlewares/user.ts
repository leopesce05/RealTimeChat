import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";


const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    await param('email').isEmail().withMessage('El email no debe estar vacio').run(req);

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

const validateEmailExists = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if(!user) {
        res.status(404).json({ message: 'No se encontró un usuario con ese email' });
        return;
    }
    req.params.paramId = user._id.toString();
    next();
}

export { validateEmailExists, validateEmail };