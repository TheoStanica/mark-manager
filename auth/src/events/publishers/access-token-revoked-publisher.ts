import { Publisher, Subjects, AccessTokenRevoked } from '@tcosmin/common';

export class AccessTokenRevokedPublisher extends Publisher<AccessTokenRevoked> {
  subject: Subjects.AccessTokenRevoked = Subjects.AccessTokenRevoked;
}
