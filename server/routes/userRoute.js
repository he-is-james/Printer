const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/sign-in');

userRouter.post('/sign-up', userController.createUser);

userRouter.post('/logout');

module.exports = userRouter;
