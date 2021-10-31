import 'reflect-metadata';
import { app } from './app';
import { PasswordResetListener } from './events/listeners/resetPasswordListener';
import { SendActivationEmailListener } from './events/listeners/sendActivationEmailListener';
import { natsWrapper } from './natsWrapper';

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.HOST_URL) {
    throw new Error('HOST_URL must be defined');
  }

  try {
    if (!process.env.GMAIL_PASSWORD) {
      throw new Error('GMAIL_PASSWORD must be defined');
    }

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

    new SendActivationEmailListener(natsWrapper.client).listen();
    new PasswordResetListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Mailer is listening on port 3000');
  });
};

start();
