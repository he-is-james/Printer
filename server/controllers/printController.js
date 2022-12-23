const Print = require('../models/printModel');

const getPrints = async (req, res) => {
  try {
    const prints = await Print.find();
    res.send(prints);
  } catch (err) {
    res.status(404).json({ error: 'No prints found' });
  }
};

const createPrint = async (req, res) => {
  try {
    const response = await Print.create(req.body);
    res.send(response);
  } catch (err) {
    res.status(404).json({ error: 'Unable to add print' });
  }
};

// add user id to likes array

// update tags

// search tags

module.exports = {
  getPrints,
  createPrint,
};
