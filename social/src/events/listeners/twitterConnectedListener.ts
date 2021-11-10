import {
  DatabaseConnectionError,
  Listener,
  Subjects,
  TwitterConnectedEvent,
} from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import Container from 'typedi';
import { UserService } from '../../services/userService';

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
      const userService = Container.get(UserService);
      const added = await userService.connectTwitterAccount({
        userId: id,
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
