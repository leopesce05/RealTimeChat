import { Job } from 'bullmq';
import { Chat } from '../../models/Chat';
import { ChatMembership } from '../../models/ChatMembership';

// Busca y elimina chats sin miembros
export const cleanEmptyChatsProcessor = async (job: Job) => {
    console.log(`🧹 Processing job ${job.id}: Cleaning empty chats`);

    const chatsWithNoMembers = await Chat.find({
        _id: { $nin: await ChatMembership.distinct('chat') }
    });

    if (chatsWithNoMembers.length > 0) {
        await Chat.deleteMany({ _id: { $in: chatsWithNoMembers.map(chat => chat._id) } });
        return { deletedCount: chatsWithNoMembers.length };
    }

    return { deletedCount: 0 };
};
