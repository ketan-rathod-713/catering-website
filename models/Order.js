import mongoose from "mongoose";
import { ONGOING } from "../data/orderStatus";

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
        default: ONGOING,
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
    },
    deliveryDate: {
        type: Date, // first it will be assigned and if delivered late then edit it and place value here.
        default: null
    },
    cancelDate: {
        type: Date, // to track cancell date
        default: null
    },
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;


