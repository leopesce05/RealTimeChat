import { createCleanEmptyChatsQueue, scheduleCleanEmptyChats } from './definitions/clean-empty-chats.queue';
import { createCleanEmptyChatsWorker } from './workers/clean-empty-chats.worker';

export const initializeQueues = async () => {
    // --- Clean Empty Chats ---
    const cleanEmptyChatsQueue = createCleanEmptyChatsQueue(); //Queue
    await scheduleCleanEmptyChats(cleanEmptyChatsQueue); //Add Job
    createCleanEmptyChatsWorker(); //Create Worker

    // Para agregar una nueva cola:
    // 1. Crear archivos en definitions/, processors/, workers/
    // 2. Agregar constantes en config/constants.ts
    // 3. Importar y llamar create/schedule/worker aqui
};
