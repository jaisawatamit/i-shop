const express = require('express');
const OrderController = require('../controllers/order.controller');

const OrderRouter = express.Router();

// Define routes and map them to controller functions
OrderRouter.get('/', OrderController.getAllOrders);
OrderRouter.post('/create-order', OrderController.createOrder);
OrderRouter.get('/:userId', OrderController.getOrderByUserId);
OrderRouter.post('/payment-success', OrderController.paymentSuccess);
OrderRouter.delete('/delete-order/:id', OrderController.deleteOrder);

module.exports = OrderRouter;