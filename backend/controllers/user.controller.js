const User = require('../models/user.model');
const CartModel = require('../models/cart.model');
const bcrypt = require('bcryptjs');
const { edit } = require('./product.controller');


const UserController = {
    // getProfile: async (req, res) => {
    //     try {
    //     const user = await User.findById(req.user.userId).select('-password');
    //       res.json(user);

    //     } catch (error) {
    //      console.error(error);
    //      res.status(200).json({ error: 'Internal Server Error' });
    //     }
    //  },
    read: async (req, res) => {
        const page = parseInt(req.query.page) || 1; // Get the page number from request body, default to 1
        const limit = 10; // Get the limit from request body, default to 10
        try {
            const users = await User.find().skip((page - 1) * limit).limit(limit); // Fetch all users from the database
            const totalCount = await User.countDocuments(); // Get total user count
            return res.status(200).json({
                success: true,
                message: "Users fetched successfully" ,
                data: users,
                totalCount, // Total number of users
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },
    editAddress: async (req, res) => {
        try {
            const { id } = req.params; // Get user ID from request params
            const { index, address } = req.body; // Get the index of the address to edit and updated address data

            if (!id || index === undefined || !address) {
                return res.status(400).json({ flag: 0, message: "Invalid request data" });
            }

            // Find user by ID
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ flag: 0, message: "User not found" });
            }

            // Check if the provided index exists in the addresses array
            if (index < 0 || index >= user.address.length) {
                return res.status(400).json({ flag: 0, message: "Invalid address index" });
            }

            // Update the address at the specified index
            user.address[index] = { ...user.address[index], ...address, updatedAt: new Date() };

            // Save updated user data
            await user.save();

            res.json({
                flag: 1,
                message: "Address edited successfully",
                user,
            });

        } catch (error) {
            console.error("Error editing address:", error);
            res.status(500).json({ flag: 0, message: "Internal server error" });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { id } = req.params; // Get user ID from request parameters
            const { name, email, phone } = req.body; // Get updated details from request body

            const updatedUser = await User.findByIdAndUpdate(
                id,
                { name, email, phone },
                { new: true, runValidators: true } // Return updated user & validate data
            );

            if (!updatedUser) {
                return res.status(200).json({ flag: 0, message: "User not found" });
            }
            console.log("Updated User:", updatedUser);
            res.status(200).json({ flag: 1, message: "User details updated successfully", user: updatedUser });
        } catch (error) {
            console.error("Error updating user profile:", error.message);
            res.status(200).json({ flag: 0, message: "Internal Server Error" });
        }
    },

    changePassword: async (req, res) => {
        try {
            const { id } = req.params; // Get user ID from URL
            const { old_password, new_password } = req.body; // Get old and new passwords from request body
            const user = await User.findOne({ _id: id });
            if (!user) {
                return res.status(404).json({ flag: 0, message: "User not found" });
            }
            const isMatch = await bcrypt.compare(old_password, user.password);
            if (!isMatch) {
                return res.status(200).json({ message: 'Invalid credentials', flag: 0 });
            }
            const hashedPassword = await bcrypt.hash(new_password, 12);
            console.log(hashedPassword);
            user.password = hashedPassword;
            const updatedUser = await user.save();
            return res.status(200).json({
                flag: 1,
                message: "Password changed successfully",
            })
        } catch (error) {
            console.error("Error changing password:", error.message);
            return res.status(500).json({ flag: 0, message: "Internal Server Error" });
        }

    },

    deleteAddress: async (req, res) => {
        try {
            const { id } = req.params; // Get user ID from URL
            const { index } = req.body; // Get address index from request body

            // Find user by ID
            const user = await User.findOne({ _id: id });
            if (!user) {
                return res.status(404).json({ flag: 0, message: "User not found" });
            }

            // Validate index
            const userAddress = user.address;
            userAddress.splice(index, 1);
            const updatedUser = await user.save();

            return res.status(200).json({
                flag: 1,
                message: "Address deleted successfully",
                user: { ...updatedUser._doc, password: "" }
            });

        } catch (error) {
            console.error("Error deleting address:", error.message);
            return res.status(500).json({ flag: 0, message: "Internal Server Error" });
        }
    },

    addcart: async (req, res) => {
        try {
            const { user_id, product_id, color_id } = req.body;
            const user = await User.findById(user_id);
            if (user) {
                const cart = await CartModel.findOne({ user_id, product_id, color_id });
                if (cart) {
                    cart.quantity += 1;
                    await cart.save();
                    res.status(200).json({ message: 'Cart updated successfully', flag: 1 });
                } else {
                    const newCart = new CartModel({ user_id, product_id, color_id, quantity: 1 });
                    await newCart.save();
                    res.status(200).json({ message: 'Cart added successfully', flag: 1 });
                }
            }

        } catch (error) {
            res.status(200).json({ message: 'Internal Server error', flag: 0 });
        }
    },

    addaddress: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(200).json({ message: 'User not found', flag: 0 });
            user.address.push(req.body);
            console.log(req.body);

            const updatedUser = await user.save();
            res.status(200).json({ message: 'Address added successfully', updatedUser: { ...updatedUser.toJSON(), password: "" }, flag: 1 });
        } catch (error) {
            res.status(200).json({ message: 'Internal Server error', flag: 0 });
        }
    },
    register: async (req, res) => {
        try {
            const { email, password, name, phone } = req.body;
            // Check if user already exists
            const existingUser = await User.findOne({ email, phone });
            if (existingUser) {
                res.status(200).json({ message: 'User already exists', flag: 0 });
            }
            // Create a new user
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword, name, phone });
            const newUser = await user.save();
            res.status(200).json({ message: 'User registered successfully', flag: 1, user: { ...newUser, password: "" } });
        } catch (err) {
            console.error('Error registering user:', err);
            res.status(200).json({ message: 'Server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(200).json({ message: 'Invalid credentials', flag: 0 });
            }


            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(200).json({ message: 'Invalid credentials', flag: 0 });
            }

            const userCart = await CartModel.find({ user_id: user._id }).populate({
                path: "product_id",
                select: "_id original_price discounted_price"
            })

            // Generate JWT
            res.json({
                message: "user login ", flag: 1, user: {
                    ...user.toJSON(), password: "", cart: userCart
                }
            });
        } catch (error) {
            console.log(error)
            res.status(200).json({ message: 'Server error', error: error.message, flag: 0 });
        }
    },

    // getProfile: async (req, res) => {
    //     try {
    //         const user = await User.findById(req.user.userId).select('-password');
    //         res.json(user);
    //     } catch (err) {
    //         res.status(200).json({ msg: 'Server error' });
    //     }
    // },

    // updateProfile: async (req, res) => {
    //     try {
    //         const { name, email } = req.body;

    //         const user = await User.findById(req.user.userId);
    //         if (!user) {
    //             return res.status(200).json({ msg: 'User not found' });
    //         }

    //         user.name = name || user.name;
    //         user.email = email || user.email;

    //         await user.save();

    //         res.json({ msg: 'Profile updated successfully' });
    //     } catch (err) {
    //         res.status(200).json({ msg: 'Server error' });
    //     }
    // },

    // logout: (req, res) => {
    //     res.json({ msg: 'User logged out successfully' });
    // }
};


module.exports = UserController;
