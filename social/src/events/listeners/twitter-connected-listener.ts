import {
  DatabaseConnectionError,
  Listener,
  Subjects,
  TwitterConnectedEvent,
} from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { UserController } from '../../controllers/user-controller';

export class TwitterConnectedListener extends Listener<TwitterConnectedEvent> {
  subject: Subjects.TwitterConnected = Subjects.TwitterConnected;

  queueGroupName = queueGroupName;

  async onMessage(data: TwitterConnectedEvent['data'], msg: Message) {
    const {
      id,
      oauthAccessToken,
      oauthAccessTokenSecret,
      twitterScreenName,
      twitterUserId,
    } = data;

    try {
      const added = await UserController.addTwitterTokens({
        userID: id,
        oauthAccessToken,
        oauthAccessTokenSecret,
        twitterScreenName,
        twitterUserId,
      });
      if (added) msg.ack();
    } catch (err) {
      throw new DatabaseConnectionError();
    }
  }
}
