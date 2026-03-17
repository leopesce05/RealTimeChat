const constants = {
    QUEUE_NAMES: {
        EMPTY_CHATS: 'empty-chats',
    },
    CRON: {
        CLEAN_EMPTY_CHATS: '0 3 * * *', // Every day at 3:00 AM
    },
};

export default constants;