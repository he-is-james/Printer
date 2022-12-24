const mongoose = require('mongoose');

const printSchema = new mongoose.Schema({
  author: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
  likes: {
    required: true,
    type: Array,
  },
  tags: {
    required: true,
    type: Array,
  },
});

module.exports = mongoose.model('Print', printSchema);
