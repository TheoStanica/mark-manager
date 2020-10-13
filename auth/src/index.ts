import mongoose from 'mongoose';
import { app } from './app';
import { redisWrapper } from './redis-wrapper';

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.JWT_REFRESH_KEY) {
    throw new Error('JWT_REFRESH_KEY must be defined');
  }
  if (!process.env.REDIS_HOST) {
    throw new Error('REDIS_HOST must be defined');
  }
  if (!process.env.ACCESS_TOKEN_TTL) {
    throw new Error('ACCESS_TOKEN_TTL must be defined');
  }
  if (!process.env.REFRESH_TOKEN_TTL) {
    throw new Error('REFRESH_TOKEN_TTL must be defined');
  }

  try {
    await redisWrapper.connect(process.env.REDIS_HOST);
    // redisWrapper.client.on('quit', () => {
    //   console.log('Redis Connection closed!');
    //   process.exit();
    // })
    // process.on('SIGINT', () =>  redisWrapper.client.quit())
    // process.on('SIGTERM', () =>  redisWrapper.client.quit())

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Auth is listening on port 3000');
  });
};

start();
