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
    console.log(req.query);
    const response = await User.findOne(req.query);
    console.log(response);
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'No user found' });
  }
};

module.exports = {
  createUser,
  getUser,
};
