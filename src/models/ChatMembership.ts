import { Schema, model, Document, Types } from 'mongoose';

export interface IChatMembership extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId,
    chat: Types.ObjectId,
    role: 'admin' | 'member',
    lastReadMessage: Types.ObjectId
}

const chatMembershipSchema = new Schema<IChatMembership>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    },
    lastReadMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    }
}, {
    timestamps: true
});

// Índices para optimizar consultas
chatMembershipSchema.index({ user: 1 });
chatMembershipSchema.index({ chat: 1 });
chatMembershipSchema.index({ user: 1, chat: 1 }, { unique: true }); 


export const ChatMembership = model<IChatMembership>('ChatMembership', chatMembershipSchema);