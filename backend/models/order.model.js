const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    original_price: { type: Number, required: true },
    discounted_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [productSchema],
    final_total: { type: Number, required: true },
    original_total: { type: Number, required: true },
    address: { 
        name: String,
        street: String,
        area: String,
        district: String,
        state: String,
        pincode: String,
        contact: String
    },
    payment_method : { type: String, required: true },
    payment_status: { type: String, enum: [1, 2, 3, 4], default: 1 },
    order_status: { type: Number, enum: [0, 1, 2, 3, 4], default: 1 },
    transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);