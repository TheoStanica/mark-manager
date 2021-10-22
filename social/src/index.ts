import 'reflect-metadata';
import mongoose from 'mongoose';
import { app } from './app';
import { TwitterConnectedListener } from './events/listeners/twitterConnectedListener';
import { natsWrapper } from './nats-wrapper';

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

  try {
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

    new TwitterConnectedListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Social is listening on port 3000');
  });
};

start();
