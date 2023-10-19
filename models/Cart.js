import mongoose from "mongoose";
import User from "./User";
import Product from "./Product";

export const cartProductSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    }
})

const CartProduct = mongoose.models.CartProduct || mongoose.model("CartProduct", cartProductSchema)

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products : {
        type: [cartProductSchema],
        default: [],
    },
    totalPrice: {
        type: Number,
        default: 0
    }
})

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;


