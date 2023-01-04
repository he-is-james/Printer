/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');

passport.serializeUser((user, done) => {
  console.log('=== serialize ... called ===');
  console.log({
    _id: user._id,
    handle: user.handle,
  });
  console.log('============================');
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    console.log('=== deserializing ... called ===');
    console.log('================================');
    done(err, user);
  });
});

// Create a new user
passport.use('sign-up', new LocalStrategy(
  {
    usernameField: 'handle',
    passwordField: 'password',
  },
  async (handle, password, done) => {
    try {
      const userExists = await User.findOne({ handle });
      // Check if the user already exists
      if (userExists) {
        return done(null, false, { message: 'That user handle already exists' });
      }
      // Generate a salted password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);
      // Create a new user object
      const user = await User.create({
        handle,
        password: hashedPassword,
        postsLiked: [],
      });
      return done(null, user);
    } catch (err) {
      return done(err, false, { message: 'Unable to create a user' });
    }
  },
));

// Sign in and send them user data
passport.use('sign-in', new LocalStrategy(
  {
    usernameField: 'handle',
    passwordField: 'password',
  },
  async (handle, password, done) => {
    try {
      // Check if a user exists
      const userExists = await User.findOne({ handle });
      if (!userExists) {
        return done(null, false, { message: 'That user does not exist' });
      }
      // Check if the password matches
      const match = bcrypt.compareSync(password, userExists.password);
      if (match) {
        return done(null, userExists);
      }
      return done(null, false, { message: 'Wrong password' });
    } catch (err) {
      return done(err, false, { message: 'Unable to sign in' });
    }
  },
));

module.exports = passport;
