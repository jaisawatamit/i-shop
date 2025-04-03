// /Users/amitsinghjaisawat/Desktop/wscube teach/Nodejs/test/backend/controllers/admin.controller.js
const AdminModel = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const AdminController = {
    // register: (req, res) => {
    //     // Logic for registering an admin
    //     res.send('Admin registered successfully');
    // },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const admin = await AdminModel.findOne({ email });
            // console.log(admin);

            if (!admin) {
                return res.status(200).json({ message: 'admin not found', flag: 0 });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(200).json({ message: 'Invalid credentials', flag: 0 });
            }

            // Generate JWT
            res.status(200).json({
                message: " admin login ", flag: 1, admin: {
                    ...admin.toJSON(), password: ""
                }, flag: 1
            });
        } catch (error) {
            res.status(200).json({ message: 'Internal Server error', flag: 0 });
        }
    },

    read: async (req, res) => {

        try {
            const admin = await AdminModel.find();
            res.send({ admin, flag: 1 });
        } catch (error) {
            res.status(200).json({ message: 'Internal Server error', flag: 0 });
        }

    },
};

module.exports = AdminController;