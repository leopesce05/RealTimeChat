import { RedisClient } from '../config/redis';

export const createQueueConnection = () => RedisClient.createBullMQConnection();
