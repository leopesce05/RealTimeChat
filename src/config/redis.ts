import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

interface RedisConfig {
    host: string;
    port: number;
    username?: string;
    password?: string;
    db?: number;
    maxRetriesPerRequest?: number;
}

class RedisClient {
    private static instance: Redis | null = null;
    private static queueInstance: Redis | null = null;
    private static isConnecting = false;


    static getInstance(): Redis {
        if (!RedisClient.instance) {
            RedisClient.instance = RedisClient.createConnection();
        }
        return RedisClient.instance;
    }

    static getQueueInstance(): Redis {
        if (!RedisClient.queueInstance) {
            RedisClient.queueInstance = RedisClient.createBullmqConnection();
        }
        return RedisClient.queueInstance;
    }

    private static createBullmqConnection(): Redis {
        const config: RedisConfig = {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            db: parseInt(process.env.REDIS_DB || '0'),
            maxRetriesPerRequest: null,
        };
        const redis = new Redis(config);

        return redis;
    }
    private static createConnection(): Redis {
        const config: RedisConfig = {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            db: parseInt(process.env.REDIS_DB || '0'),
            maxRetriesPerRequest: 3,
        };

        const redis = new Redis(config);

        // Connection events
        redis.on('connect', () => {
            console.log('✅ Redis connected successfully');
            RedisClient.isConnecting = false;
        });

        redis.on('error', (error) => {
            console.error('❌ Redis connection error:', error.message);
            RedisClient.isConnecting = false;
        });

        redis.on('close', () => {
            console.log('🔌 Redis connection closed');
            RedisClient.isConnecting = false;
        });

        redis.on('reconnecting', () => {
            console.log('🔄 Redis reconnecting...');
            RedisClient.isConnecting = true;
        });

        return redis;
    }

    static async testConnection(): Promise<boolean> {
        try {
            const redis = RedisClient.getInstance();
            await redis.ping();
            console.log('✅ Redis connection test successful');
            return true;
        } catch (error) {
            console.error('❌ Redis connection test failed:', error);
            return false;
        }
    }

    static async disconnect(): Promise<void> {
        if (RedisClient.instance) {
            await RedisClient.instance.disconnect();
            RedisClient.instance = null;
        }
    }
}

// Export singleton instance
const redis = RedisClient.getInstance();
export default redis;

// Export utility functions
export { RedisClient };