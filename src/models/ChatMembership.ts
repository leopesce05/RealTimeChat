import { Schema, model, Document, Types } from 'mongoose';

export interface IChatMembership extends Document {
    user: Types.ObjectId,
    chat: Types.ObjectId,
    role: 'admin' | 'member',
    joinedAt: Date,
    lastActive: Date
}



const userChatMembershipSchema = new Schema<IUserChatMembership>({