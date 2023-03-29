import {
  DatabaseConnectionError,
  FacebookConnectedEvent,
  Listener,
  Subjects,
} from '@tcosmin/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import Container from 'typedi';
import { UserService } from '../../services/userService';

export class FacebookConnectedListener extends Listener<FacebookConnectedEvent> {
  subject: Subjects.FacebookConnected = Subjects.FacebookConnected;

  queueGroupName = queueGroupName;

  async onMessage(data: FacebookConnectedEvent['data'], msg: Message) {
    try {
      const userService = Container.get(UserService);
      const added = await userService.connectFacebookAccount(data);
      if (added) msg.ack();
    } catch (err) {
      throw new DatabaseConnectionError();
    }
  }
}
