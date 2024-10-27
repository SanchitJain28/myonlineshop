import mongoose from "mongoose";

const orderSchemma=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpressTutorial-MakingUser', // Reference to the user who placed the order
        required: true,
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product schema
                required: true,
            },
            seller:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SellerAccount', // Reference to the Product schema
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    // paymentMethod: {
    //     type: String,
    //     required: true,
    // },
    // paymentResult: {
    //     id: { type: String },
    //     status: { type: String },
    //     update_time: { type: String },
    //     email_address: { type: String },
    // },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const orderModel=mongoose.model('order', orderSchemma);