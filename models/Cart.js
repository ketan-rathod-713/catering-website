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
        default: 1
    }
})

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products : {
        type: [cartProductSchema],
        default: []
    },
    totalPrice: {
        type: Number,
        default: 0
    }
})

cartSchema.pre('save', function(next){
    const products = this.products;
    // Calculate the totalPrice based on the products in the cart
    const totalPrice = products.reduce((total, product) => {
        // Assuming each product has a price and quantity property
        return total + (product.product.price * product.quantity);
    }, 0);
    console.log("updating mongodb");
    this.totalPrice = totalPrice;
    next();
})

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;


