const express = require('express');
const passport = require('../passportConfig');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post(
  '/sign-in',
  passport.authenticate('sign-in'),
  (req, res) => {
    res.send(req.user);
  },
);

userRouter.post(
  '/sign-up',
  passport.authenticate('sign-up'),
  (req, res) => {
    res.send(req.user);
  },
);

userRouter.post('/sign-out', (req, res) => {
  console.log(req);
  if (req.user) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.send('Logging out');
  } else {
    res.send('No user to log out');
  }
});

userRouter.get('/all-liked-posts', userController.getLikedPosts);

userRouter.post('/update-likes', userController.updateLikes);

module.exports = userRouter;
