const redis = require('redis');

const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.connect().then(() => {});

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (error) => {
    console.log(error);
});

module.exports = client;