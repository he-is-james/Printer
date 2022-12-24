const express = require('express');

const printRouter = express.Router();
const printController = require('../controllers/printController');

printRouter.get('/all-prints', printController.getPrints);

printRouter.post('/new-print', printController.createPrint);

printRouter.post('/like-post', printController.likePost);

printRouter.get('/search-tags', printController.searchTags);

module.exports = printRouter;
