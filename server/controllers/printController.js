const Print = require('../models/printModel');

// Get all prints made by users
const getPrints = async (req, res) => {
  try {
    const prints = await Print.find();
    res.send(prints);
  } catch (err) {
    res.status(404).json({ error: 'Unable to find prints' });
  }
};

// Create a new print
const createPrint = async (req, res) => {
  try {
    const response = await Print.create(req.body);
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'Unable to add print' });
  }
};

// Update the like array
const updateLikes = async (req, res) => {
  try {
    const response = await Print.findByIdAndUpdate(req.body.printId, req.body.command);
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'Unable to update print' });
  }
};

// Update the like array on a print by adding the user's id
const likePost = async (req, res) => {
  try {
    const response = await Print.findByIdAndUpdate(req.body.printId, {
      $push: { likes: req.body.printerId },
    });
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'Unable to update print' });
  }
};

// Update the like array on a print by removing the user's id
const unlikePost = async (req, res) => {
  try {
    const response = await Print.findByIdAndUpdate(req.body.printId, {
      $pull: { likes: { $in: req.body.printerId } },
    });
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'Unable to update print' });
  }
};

// Search through the tags
const searchTags = async (req, res) => {
  try {
    const foundPrints = await Print.aggregate([
      {
        $match: { tags: { $in: [req.query.tag] } },
      },
    ]);
    res.send(foundPrints);
  } catch (err) {
    res.status(404).json({ error: 'Unable to search tags' });
  }
};

module.exports = {
  getPrints,
  createPrint,
  likePost,
  updateLikes,
  unlikePost,
  searchTags,
};
