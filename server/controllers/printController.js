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

// Update the like array on a print
const likePost = async (req, res) => {
  try {
    const response = await Print.findByIdAndUpdate(req.body.id, {
      $push: { likes: req.body.printerId },
    });
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'Unable to find prints' });
  }
};

// Search through the tags
const searchTags = async (req, res) => {
  try {
    const prints = await Print.aggregate([
      {
        $project: {
          author: 1,
          body: 1,
          likes: 1,
          tags: { $cond: [{ $in: [req.query.tag, '$tags'] }, '$tags', 0] },
        },
      },
    ]);
    const foundPrints = [];
    prints.forEach((print) => {
      if (print.tags) {
        foundPrints.push(print);
      }
    });
    res.send(foundPrints);
  } catch (err) {
    res.status(404).json({ error: 'Unable to search tags' });
  }
};

module.exports = {
  getPrints,
  createPrint,
  likePost,
  searchTags,
};
