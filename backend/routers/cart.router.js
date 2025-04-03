const express = require('express');
const CartController = require("../controllers/cart.controller")

const CartRouter = express.Router();


CartRouter.delete('/cartitem-delete/:id', CartController.cartItemDelete);
CartRouter.delete('/cart-clear/:userId', CartController.cartClear); 
CartRouter.patch('/quantity/:id', CartController.itemQuantity); 
      
module.exports = CartRouter;