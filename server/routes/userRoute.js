const express = require('express');
const passport = require('../passportConfig');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post(
  '/sign-in',
  passport.authenticate('sign-in'),
  (req, res) => {
    res.json(req.user);
  },
);

userRouter.post(
  '/sign-up',
  passport.authenticate('sign-up'),
  (req, res) => {
    res.json(req.user);
  },
);

userRouter.post('/sign-out', (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(404).json({ error: 'Unable to logout properly' });
    }
  });
  res.send('Logging out');
});

userRouter.get('/all-liked-posts', userController.getLikedPosts);

userRouter.post('/update-likes', userController.updateLikes);

module.exports = userRouter;
