import mongoose from "mongoose";
import User from "./User";
import Product from "./Product";


const cartSchema = mongoose.Schema({
    user: {
        type: User,
        required: true
    },
    products: [],
})

const Cart = mongoose.models.cart || mongoose.model("Cart", cartSchema);

export default Cart;


