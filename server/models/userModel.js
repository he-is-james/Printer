const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  handle: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  postsLiked: {
    required: true,
    type: Array,
  },
});

module.exports = mongoose.model('User', userSchema);
