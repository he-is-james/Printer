const User = require('../models/userModel');

// Get all user liked posts
const getLikedPosts = async (req, res) => {
  try {
    const userData = await User.findById(req.query.printerId);
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
  getLikedPosts,
  updateLikes,
};
