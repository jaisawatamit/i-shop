const express = require('express');
const TransactionController = require('../controllers/transaction.controller');
// const authMiddleware = require('../middlewares/auth.middleware');

const TransactionRouter = express.Router();

TransactionRouter.get("/", TransactionController.read)

module.exports = TransactionRouter