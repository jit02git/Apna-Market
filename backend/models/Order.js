// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 }
        }
    ],
    shippingAddress: { type: String, required: true },
    fullName: { type: String, required: true },
    pincode: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
