import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  // username: process.env.REDIS_NAME,
  // password: process.env.REDIS_SECRET,
  socket: {
    host: '10.178.0.2',
    port: 6379,
  },
  // legacyMode: true,
});
// const client = createClient({
//   // username: process.env.REDIS_NAME,
//   // password: process.env.REDIS_SECRET,
//   socket: {
//     host: '127.0.0.1',
//     port: 6379,
//   },
//   // legacyMode: true,
// });

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export { client };
