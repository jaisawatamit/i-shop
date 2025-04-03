const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transitionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order', 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymenyt_status: {
        type: String,
        enum: [1, 2, 3],
        // default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: [1, 2],
        required: true
    },
    razorpay_order_id: {
        type: String,
    },
    razorpay_payment_id: {
        type: String
    },
    razorpay_signature: {
        type: String
    }

},
    {
        timestamps: true
    }

);



const TransactionModel = mongoose.model('Transition', transitionSchema);

module.exports = TransactionModel;