import { Worker } from 'bullmq';
import constants from '../../config/constants';
import { createQueueConnection } from '../connections';
import { cleanEmptyChatsProcessor } from '../processors/clean-empty-chats.processor';

const QUEUE_NAME = constants.QUEUE_NAMES.EMPTY_CHATS;

export const createCleanEmptyChatsWorker = () => {
    const worker = new Worker(QUEUE_NAME, cleanEmptyChatsProcessor, {
        connection: createQueueConnection(),
        removeOnComplete: { count: 1 },
        removeOnFail: { count: 5000 },
    });

    worker.on('completed', (job) => {
        console.log(`✅ Job ${job?.id} completed on queue "${QUEUE_NAME}"`);
    });

    worker.on('failed', (job, err) => {
        console.error(`❌ Job ${job?.id} failed on queue "${QUEUE_NAME}":`, err.message);
    });

    return worker;
};
