const express = require('express');

const printRouter = express.Router();
const printController = require('../controllers/printController');

printRouter.get('/all-prints', printController.getPrints);

printRouter.post('/new-print', printController.createPrint);

printRouter.post('/update-likes', printController.updateLikes);

printRouter.post('/unlike-post', printController.unlikePost);

printRouter.get('/search-tags', printController.searchTags);

module.exports = printRouter;
