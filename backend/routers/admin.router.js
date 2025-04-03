const express = require('express');
const AdminController = require('../controllers/admin.controller');

const AdminRouter = express.Router();

// Register
// AdminRouter.post('/register', AdminController.register);

// Login
AdminRouter.post('/login', AdminController.login);

// Admin Listing
AdminRouter.get('/', AdminController.read);

// Admin Profile
// AdminRouter.get('/admin-profile', AdminController.adminProfile);

module.exports = AdminRouter;