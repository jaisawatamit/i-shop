const express = require('express');
const UserController = require('../controllers/user.controller');
// const authMiddleware = require('../middlewares/auth.middleware');

const UserRouter = express.Router();
// Get user profile
// UserRouter.get('/profile',  UserController.getProfile);
UserRouter.get('/',  UserController.read);

// User registration
UserRouter.post('/register', UserController.register);

// User login
UserRouter.post('/login', UserController.login);

UserRouter.post('/add-address/:id', UserController.addaddress);

UserRouter.post("/add-cart", UserController.addcart);

UserRouter.patch("/delete-address/:id", UserController.deleteAddress);
UserRouter.post("/change-password/:id", UserController.changePassword);
UserRouter.put("/edit-address/:id", UserController.editAddress);





// // Update user profile
UserRouter.put('/change-details/:id',  UserController.updateProfile);

// // Delete user account
// UserRouter.post('/logout',  UserController.logout);

module.exports = UserRouter;