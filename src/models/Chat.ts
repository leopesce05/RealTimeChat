import { Schema, model, Document, Types } from 'mongoose';

export interface IChat extends Document {
    _id: Types.ObjectId;
    name: string;
    type: 'private' | 'group';
    lastMessage: string;
}

const chatSchema = new Schema<IChat>({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['private', 'group'],
        required: true
    },
    lastMessage: {
        type: String,
        required: true
    }
})


export const Chat = model<IChat>('Chat', chatSchema);