import mongoose from "mongoose";
import Product from "./Product";
import User from "./User";

const ProductReviewSchema = mongoose.Schema({
    reviewText: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const ProductReview = mongoose.models.ProductReview || mongoose.model("ProductReview", ProductReviewSchema);

export default ProductReview;


