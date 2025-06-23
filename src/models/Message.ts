import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
    _id: Types.ObjectId;
    type: 'private' | 'group';
    message: string;
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    readBy: Types.ObjectId[];
    date: Date;
}


const messageSchema = new Schema<IMessage>({
    type: {
        type: String,
        enum: ['private', 'group'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    readBy: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;