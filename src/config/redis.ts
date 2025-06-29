import Redis from 'ioredis';

const redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        username: process.env.REDIS_USERNAME || 'default',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        maxRetriesPerRequest: null
    });

// Handle connection events
redis.on('connect', () => {
    console.log('✅ Redis connected successfully');
});

redis.on('error', (error) => {
    console.error('❌ Redis connection error:', error);
});

redis.on('close', () => {
    console.log('🔌 Redis connection closed');
});

export default redis;