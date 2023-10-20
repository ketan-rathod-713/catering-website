import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    products: {
        type: [],
        default: [],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;


