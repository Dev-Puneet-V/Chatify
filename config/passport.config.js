const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
  User
 } = require('../models');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          google_id: profile.id
        });
        if (existingUser) {
          return done(null, existingUser._id);
        }
        const newUser = new User({
          name: profile.displayName,
          gmail: profile.emails[0].value,
          google_id: profile.id,
          profile_photo: profile.photos[0].value
        });
        console.log(newUser)
        await newUser.save();
        done(null, newUser._id);
      } catch (err) {
        done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
