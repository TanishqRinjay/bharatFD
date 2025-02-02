import redis from "redis";

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
    },
    password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => console.error("Redis Error:", err));
redisClient.on("connect", () => console.log("Redis Cache Connected"));

await redisClient.connect();
export default redisClient;
