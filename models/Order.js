import mongoose from "mongoose";

const productOrderSchema = mongoose.Schema({
    product: {
        type: {},
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    }
})

const orderSchema = mongoose.Schema({
    products: {
        type: [productOrderSchema],
        default: [],
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "ongoing",
        required: true
    },
    timeWhenOrdered: {
        type: Date,
        default: new Date(),
        required: true
    },
    paymentOption: {
        type: String,
        required: true
    }
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;


