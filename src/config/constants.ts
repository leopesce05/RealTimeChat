const constants = {
    QUEUE_NAMES: {
        EMPTY_CHATS: 'empty-chats',
    },
    SCHEDULER_IDS: {
        CLEAN_EMPTY_CHATS: 'clean-empty-chats-scheduler',
    },
    CRON: {
        CLEAN_EMPTY_CHATS: '0 3 * * *', // Every day at 3:00 AM
    },
};

export default constants;