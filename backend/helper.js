const crypto = require('crypto');

const getRandomFileName = (file_name)=>{

    return (Math.random() * 1000) + (new Date().getTime()) + file_name;
}



const verifyPaymentSignature = (order_id, razorpay_payment_id, razorpay_signature, secret = process.env.KEY_SECRET) => {
    const generated_signature = crypto.createHmac('sha256', secret)
                                      .update(order_id + "|" + razorpay_payment_id)
                                      .digest('hex');
    return generated_signature === razorpay_signature;
}

module.exports = { getRandomFileName, verifyPaymentSignature }