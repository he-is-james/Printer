const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/sign-in', userController.getUser);

userRouter.post('/sign-up', userController.createUser);

userRouter.post('/logout');

userRouter.get('/liked-posts', userController.getLikedPosts);

module.exports = userRouter;
