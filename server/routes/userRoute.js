const express = require('express');
const passport = require('../passportConfig');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post(
  '/sign-in',
  passport.authenticate('sign-in'),
  (req, res) => {
    res.json(req.user);
    console.log(req.session);
  },
);

userRouter.post(
  '/sign-up',
  passport.authenticate('sign-up'),
  (req, res) => {
    res.json(req.user);
  },
);

userRouter.post(
  '/test',
  (req) => {
    console.log(req.session);
    console.log(req.user);
  },
);

userRouter.post('/sign-out', (req, res) => {
  console.log(req.session);
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
  });
  console.log(req.session);
  res.send('Logging out');
});

userRouter.get('/all-liked-posts', userController.getLikedPosts);

userRouter.post('/update-likes', userController.updateLikes);

module.exports = userRouter;
