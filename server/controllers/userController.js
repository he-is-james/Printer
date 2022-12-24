const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const response = await User.create({
      handle: req.body.handle,
      password: req.body.password,
      postsLiked: [],
    });
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'Unable to create a user' });
  }
};

const getUser = async (req, res) => {
  try {
    const response = await User.findOne(req.query);
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'Unable to find user' });
  }
};

// Get all user liked posts
const getLikedPosts = async (req, res) => {
  try {
    const userData = await User.findOne(req.query);
    res.send(userData.postsLiked);
  } catch (err) {
    res.status(404).json({ error: 'Unable to get liked posts' });
  }
};

// Add print id to user liked post array
const updateLikes = async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(req.body.printerId, req.body.command);
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'Unable to get liked posts' });
  }
};

module.exports = {
  createUser,
  getUser,
  getLikedPosts,
  updateLikes,
};
