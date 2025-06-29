import { Queue, Worker, Job } from 'bullmq';
import redis from '../config/redis';
import { ChatMembership } from '../models/ChatMembership';
import { Chat } from '../models/Chat';

export const emptyChatsQueue = new Queue('empty-chats', {
    connection: redis
});

// Initialize repeatable job for cleaning empty chats
export const initializeRepeatableJob = async () => {
    try {
        await emptyChatsQueue.upsertJobScheduler(
            'repeat-every-10s',
            {
                every: 86400000, // 1 day
            },
            {
                name: 'clean-empty-chats',
                data: { jobData: 'clean empty chats' },
                opts: {}, 
            },
        );
        console.log('✅ Job - Clean empty chats - initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing repeatable job:', error);
    }
};

// Worker function to find empty chats
const findEmptyChats = async () => {
    const chatsWithNoMembers = await Chat.find({
        _id: {
            $nin: await ChatMembership.distinct('chat')
        }
    });
    return chatsWithNoMembers;
};

// Create worker
export const worker = new Worker(
    'empty-chats',
    async (job: Job) => {
        console.log(`🧹 Processing job ${job.id}: Cleaning empty chats`);
        
        const chats = await findEmptyChats();
        if (chats.length > 0) {
            await Chat.deleteMany({ _id: { $in: chats.map(chat => chat._id) } });
            return { deletedCount: chats.length };
        } else {
            return { deletedCount: 0 };
        }
    },
    {
        connection: redis,
        removeOnComplete: { count: 1 },
        removeOnFail: { count: 5000 }
    },
);

console.log('🚀 Empty chats worker started');
