const express = require('express');

// const InfoController = require('./controllers/InfoController');
const ReceiptController = require('./controllers/ReceiptController');
// const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// routes.post('/sessions', SessionController.create);

routes.get('/receipts', ReceiptController.index);
routes.post('/receipts', ReceiptController.create);
routes.delete('/receipts/:numeration', ReceiptController.delete);

// routes.get('/receipts', ReceiptController.index);
// routes.post('/receipts', ReceiptController.create);
// routes.delete('/receipts/:numeration', ReceiptController.delete);

module.exports = routes;
