import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
    _id: Types.ObjectId;
    message: string;
    from: Types.ObjectId;
    toChat: Types.ObjectId;
    date: Date;
}


const messageSchema = new Schema<IMessage>({
    message: {
        type: String,
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toChat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export const Message = model<IMessage>('Message', messageSchema);