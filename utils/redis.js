const createClient = require('redis').createClient;


const client = createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

client.connect().then(() => {});

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (error) => {
    console.log(error);
});

module.exports = client;