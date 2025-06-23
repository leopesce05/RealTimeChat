import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    contacts: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        contacts: {
            type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            default: []
        }
    },
    { timestamps: true }
);

// Agregar indices para mejorar performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export const User = model<IUser>('User', userSchema);