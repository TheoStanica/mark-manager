import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { FacebookConnectedPublisher } from '../../events/publishers/facebookConnectedPublisher';
import { natsWrapper } from '../../natsWrapper';

const hostURL = process.env.HOST_URL;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: `https://${hostURL}/api/auth/facebook/callback`,
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      await new FacebookConnectedPublisher(natsWrapper.client).publish({
        id: String(req.session.userId),
        accessToken: accessToken,
        data: {
          id: profile.id,
          displayName: profile.displayName,
          username: profile.username,
        },
      });

      done(null, profile);
    }
  )
);
