const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const { Strategy } = require("passport-google-oauth2");
const { User } = require('../models');
const { signToken } = require('../utils');

const googleParams = {
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: "https://barkend.onrender.com/api/google/callback",
  passReqToCallback: true,
};

const googleCallback = async (req, accessToken, refreshToken, profile, done) => {
  try {
    const { email, displayName, picture } = profile;
    console.log('google passport profile', profile)
    const user = await User.findOne({ email });
    console.log('google passport user', user)
    if (user) {
      const { _id: userId } = user
      const token = signToken(userId);
      user.token = token;
      user.save();
      return done(null, user)
    }
    const password = await bcrypt.hash(crypto.randomBytes(50).toString('base64'), 10);
    const newUser = (await User.create({ email, password, name: displayName, avatar: picture }));
    const { _id: userId } = newUser;
    const token = signToken(userId);
    newUser.token = token;
    newUser.save();
    done(null, newUser)
  } catch (error) {
    done(error, false)
  }
}

// https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code
// & redirect_uri=https % 3A % 2F % 2Fpurrfect - match.onrender.com % 3A443 % 2Fapi % 2Fusers % 2Fgoogle % 2Fcallback & scope=email % 20profile
// & client_id=1035769178680 - iihs65hjfqcovgk30duhl181jat5c1kq.apps.googleusercontent.com & service=lso & o2v=2 & flowName=GeneralOAuthFlow


const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy)

module.exports = passport;