import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keyPoints: {
        type: [],
        default: [],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 5,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        required: true
    },
    cost: { // cost of making this product, to calculate the total profit for only admin access field
        type: Number,
        default: 0,
        required: true
    },
    stock: { // only admin access
        type: Number,
        default: 0, // show out of stock at the frontend <10 if it is else don't send data
        required: true
    }
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;


