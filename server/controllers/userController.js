const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const response = await User.create(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createUser,
};
