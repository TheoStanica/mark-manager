import 'reflect-metadata';
import mongoose from 'mongoose';
import { app } from './app';
import { UserCreatedListener } from './events/listeners/userCreatedListener';
import { natsWrapper } from './natsWrapper';

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
  if (!process.env.AWS_ACCESS_KEY) {
    throw new Error('AWS_ACCESS_KEY must be defined');
  }
  if (!process.env.AWS_SECRET_KEY) {
    throw new Error('AWS_SECRET_KEY must be defined');
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

    new UserCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
    process.exit();
  }

  app.listen(3000, () => {
    console.log('UserProfile is listening on port 3000');
  });
};

start();
