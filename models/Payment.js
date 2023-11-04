import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paymentId: { // we can fetch data using this paymentId
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    paymentOption: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: new Date(),
        required: true
    },
    error: {
        type: String,
    },
    order: {
        type: mongoose.Types.ObjectId,
        ref: "Order",
    }
})

const Payment = mongoose.models?.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;


