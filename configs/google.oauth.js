const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

const passport = require('passport');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://thetechproject.cyclic.app/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    // console.log(profile);
  }
));

module.exports = {
    passport
}