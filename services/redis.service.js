const { createClient } = require('redis');

let redisClient = null;

const getRedis = async () => {
  if (!redisClient) {
    redisClient = await createClient({ url: 'redis://localhost:6379'});
    // redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect()
    return redisClient;
  }
  return redisClient;
}

module.exports = { getRedis };