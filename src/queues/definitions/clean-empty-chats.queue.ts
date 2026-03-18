import { Queue } from 'bullmq';
import constants from '../../config/constants';
import { createQueueConnection } from '../connections';

const QUEUE_NAME = constants.QUEUE_NAMES.EMPTY_CHATS;

export const createCleanEmptyChatsQueue = () => {
    return new Queue(QUEUE_NAME, {
        connection: createQueueConnection(),
        defaultJobOptions: {
            removeOnComplete: 1,
            removeOnFail: 5000,
        },
    });
};

export const scheduleCleanEmptyChats = async (queue: Queue) => {
    await queue.upsertJobScheduler(
        constants.SCHEDULER_IDS.CLEAN_EMPTY_CHATS,
        { pattern: constants.CRON.CLEAN_EMPTY_CHATS },
        {
            name: QUEUE_NAME,
            data: { jobData: 'clean empty chats' },
            opts: {},
        },
    );
};
