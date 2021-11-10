import 'reflect-metadata';
import mongoose from 'mongoose';
import { app } from './app';
import { EmailChangedListener } from './events/listeners/emailChangedListener';
import { natsWrapper } from './natsWrapper';
import { redisWrapper } from './redisWrapper';

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

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.TWITTER_CONSUMER_KEY) {
    throw new Error('TWITTER_CONSUMER_KEY must be defined');
  }
  if (!process.env.TWITTER_CONSUMER_SECRET) {
    throw new Error('TWITTER_CONSUMER_SECRET must be defined');
  }
  if (!process.env.HOST_URL) {
    throw new Error('HOST_URL must be defined');
  }

  try {
    await redisWrapper.connect(process.env.REDIS_HOST);
    redisWrapper.client.on('end', () => {
      console.log('Redis Connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => redisWrapper.client.quit());
    process.on('SIGTERM', () => redisWrapper.client.quit());

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to MongoDB');

    new EmailChangedListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Auth is listening on port 3000');
  });
};

start();
