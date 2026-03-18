import {RedisClient} from '../config/redis';

const redis = RedisClient.getInstance();

export const cacheService = {
    get: async (key: string) => {
        return await redis.get(key);
    },
    set: async (key: string, value: string, ttl: number = 60 * 5) => {
        return await redis.set(key, value, 'EX', ttl);
    },
    remove: async (key: string) => {
        return await redis.del(key);
    }
};