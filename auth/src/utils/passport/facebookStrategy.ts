import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

const hostURL = process.env.HOST_URL;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: `https://${hostURL}/api/auth/facebook/callback`,
      display: 'popup',
    },
    // @ts-ignore
    function (accessToken, refreshToken, profile, done) {
      console.log(
        'successfully connected... ',
        accessToken,
        refreshToken,
        profile
      );
      done(1);
      // This function will be called after successful authentication
      // Use the profile data to find or create a user account in your app
      // and call the done() function with the user object
    }
  )
);
