import { Listener, Subjects, TwitterConnectedEvent } from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { UserController } from '../../controllers/user-controller';

export class TwitterConnectedListener extends Listener<TwitterConnectedEvent> {
  subject: Subjects.TwitterConnected = Subjects.TwitterConnected;

  queueGroupName = queueGroupName;

  async onMessage(data: TwitterConnectedEvent['data'], msg: Message) {
    const { id, oauthAccessToken, oauthAccessTokenSecret } = data;

    await UserController.addTwitterTokens({
      userID: id,
      oauthAccessToken: oauthAccessToken,
      oauthAccessTokenSecret: oauthAccessTokenSecret,
    });

    msg.ack();
  }
}
