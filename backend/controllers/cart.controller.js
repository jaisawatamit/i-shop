const CartModel = require('../models/cart.model');
const User = require('../models/user.model');

const CartController = {
    itemQuantity: async (req, res) => {
        try {
            const { id } = req.params;

            const { product_id, color_id, value } = req.body;
            // console.log(req.body)
            if (!id) {
                return res.send({ flag: 0, message: "user Id requerid" });
            }
            const user = await User.findOne({ _id: id })
            // console.log(user)
            if (!user) {
                return res.send({
                    flag: 0,
                    message: "user not found"
                })
            }
            const cart = await CartModel.findOne({ product_id, color_id })
            if(cart.quantity == 1){
                if(value == -1){
                return res.send({
                    flag:0,
                    message: "quantity is already one"
                })}
            }
            cart.quantity  += value
            await cart.save();
            
            res.send({
                flag: 1,
                message: "quantity change"
            })
        } catch (error) {
            res.status(200).json({ flag: 0, message: "Server error", error: error.message });
        }
    },
    cartItemDelete: async (req, res) => {
        try {
            const { id } = req.params;

            const { product_id, color_id } = req.body;
            console.log(req.body)
            if (!id) {
                return res.send({ flag: 0, message: "user Id requerid" });
            }
            const user = await User.findOne({ _id: id })
            // console.log(user)
            if (!user) {
                return res.send({
                    flag: 0,
                    message: "user not found"
                })
            }
            const cart = await CartModel.deleteOne({ user_id: id, product_id, color_id })
            res.send({
                flag: 1,
                message: "cart item deleted"
            })
        } catch (error) {
            res.status(200).json({ flag: 0, message: "Server error", error: error.message });
        }
    },

    cartClear: async (req, res) => {
        try {
            const { userId } = req.params;
            console.log(userId, "userId Cart");
            if (!userId) {
                return res.send({ flag: 0, message: "user Id requerid" });
            }
            const user = await User.findOne({ _id: userId })
            if (!user) {
                return res.send({
                    flag: 0,
                    message: "user not found"
                })

            }
            const cart = await CartModel.deleteMany({ user_id: userId })
            res.send({
                flag: 1,
                message: "cart deleted"
            })
        } catch (error) {
            res.status(200).json({ flag: 0, message: "Server error", error: error.message });
        }
    }
}





module.exports = CartController;
