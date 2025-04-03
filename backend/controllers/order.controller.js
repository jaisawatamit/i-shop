const Order = require('../models/order.model');
const User = require('../models/user.model');
const CartModel = require('../models/cart.model');
const TransactionModel = require('../models/transaction.model');
const Razorpay = require("razorpay");
const { verifyPaymentSignature } = require("../helper");

var razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

exports.getAllOrders = async (req, res) => {
    try {
        const { page } = req.query;
        let skip = 0;
        let limit = req.query.limit ?? null;
        if (page && limit) {
            skip = limit * Number(page - 1)
        }
        console.log("page and limit",req.query)
        const total_product = await Order.countDocuments();
        const orders = await Order.find().populate({ path: "user_id", select: "name email phone" }).skip(skip).limit(limit);
        if (orders.length == 0) {
            return res.send(
                {
                    flag: 0,
                    message: "No orders!"
                }
            )
        }
        res.send(
            {
                flag: 1,
                message: "All orders!",
                orders,
                total_product,
                limit
            }
        )
        // const order = await Order.find().populate({
        //     path: "user_id",
        //     select: "_id email name phone"
        // })
        // res.send({
        //     flag: 1, order
        // })
    } catch (error) {
        res.status(200).json({ message: "Server error", error: error.message });
    }
}
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Request received to delete order:", req.params.id);
        const deletedOrder = await Order.findByIdAndDelete(id);
        deletedOrder.save();
        if (!deletedOrder) {
            return res.status(200).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


exports.createOrder = async (req, res) => {
    try {
        console.log("resived req body", req.body);
        const { user_id, address, selectedPaymentOption } = req.body;
        const user = await User.findById(user_id);
        if (user) {
            const cart = await CartModel.find({ user_id }).populate(
                {
                    path: 'product_id',
                    select: '_id original_price discounted_price'
                }
            );

            let final_total = 0, original_total = 0;
            if (cart.length != 0) {
                const products = cart.map((c) => {
                    final_total += c.product_id.discounted_price * c.quantity;
                    original_total += c.product_id.original_price * c.quantity;
                    return {
                        id: c.product_id._id,
                        original_price: c.product_id.original_price,
                        discounted_price: c.product_id.discounted_price,
                        quantity: c.quantity,
                        total_price: c.product_id.discounted_price * c.quantity
                    }
                })
                const order = new Order({
                    user_id,
                    products,
                    final_total,
                    original_total,
                    address,
                    payment_method: selectedPaymentOption,
                    order_status: selectedPaymentOption == 1 ? 1 : 0
                })
                await order.save();
                if (selectedPaymentOption == 1) {
                    await CartModel.deleteMany({ user_id });
                    res.send({ message: 'Order placed successfully', flag: 1, order_id: order._id });
                } else {
                    const options = {
                        amount: final_total * 100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        currency: "INR",
                        receipt: order._id
                    };
                    razorpayInstance.orders.create(
                        options,
                        function (err, razorpayorder) {
                            if (!err) {
                                res.send({
                                    message: "procced for payment", razorpay_order_id: razorpayorder.id, order_id: order._id, flag: 1
                                })
                            } else {
                                res.send({
                                    message: "unable to palce order", flag: 0
                                })
                            }
                        }
                    )
                }
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ message: "internal server eroor", error: error.message, flag: 0 });
    }
};

// const initRazorPay = () => {
//     // Implement RazorPay initialization logic here
// }


// exports.getOrderById = async (req, res) => {
//     try {
//         const user_id = req.params.id;
//         if (user_id) {
//             const orders = await Order.find({ user_id }).sort({ createdAt: -1 });
//             res.status(200).json({ message: 'Orders fetched successfully', flag: 1, orders });
//         } else {
//             const total_order = await Order.countDocuments();
//             const order = await Order.find();
//             if (order) {
//                 res.send({ message: 'Order fetched successfully', flag: 1, order, total_order });
//             } else {
//                 res.send({ message: 'No order found', flag: 0 });
//             }
//         }
//     } catch (error) {
//         console.log(error.message);
//         res.status(200).json({ message: "internal server eroor", error: error.message, flag: 0 });
//     }
// };


exports.getOrderByUserId = async (req, res) => {
    try {
        const user_id = req.params.userId;
        if (user_id) {
            const orders = await Order.find({ user_id }).sort({ createdAt: -1 }).populate('products.id');
            res.status(200).json({ message: 'Orders fetched successfully', flag: 1, orders });
        } else {
            const total_order = await Order.countDocuments();
            const order = await Order.find();
            if (order) {
                res.send({ message: 'Order fetched successfully', flag: 1, order, total_order });
            } else {
                res.send({ message: 'No order found', flag: 0 });
            }
        }
    } catch (error) {
        // console.log(error.message); 
        res.status(200).json({ message: "internal server eroor", error: error.message, flag: 0 });
    }
};

exports.paymentSuccess = async (req, res) => {
    try {
        const { razorpay_response, order_id } = req.body;
        if (verifyPaymentSignature(razorpay_response.razorpay_order_id, razorpay_response.razorpay_payment_id, razorpay_response.razorpay_signature)) {
            const order = await Order.findById(order_id);
            if (order) {
                order.order_status = 1
                await order.save();

                const transition = {
                    user_id: order.user_id,
                    order_id: order._id,
                    amount: order.final_total,
                    paymentMethod: 2,
                    paymenyt_status: 2,
                    razorpay_order_id: razorpay_response.razorpay_order_id,
                    razorpay_payment_id: razorpay_response.razorpay_payment_id,
                    razorpay_signature: razorpay_response.razorpay_signature,
                }

                await TransactionModel.create(transition);
                await CartModel.deleteMany({ user_id: order.user_id });
                res.send({ message: "order placed successfully", flag: 1, order_id: order._id })
            } else {
                res.send({
                    message: "order not found", flag: 0
                })
            }
        } else {
            res.send({
                message: "invaild payemnet signature", flag: 0
            })
        }
    } catch (error) {
        res.status(200).json({ message: "internal server eroor", error: error.message, flag: 0 });
    }
};


