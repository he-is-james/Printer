const express = require('express');

const printRouter = express.Router();
const printController = require('../controllers/printController');

printRouter.get('/all-prints', printController.getPrints);

printRouter.post('/new-print', printController.createPrint);

module.exports = printRouter;
