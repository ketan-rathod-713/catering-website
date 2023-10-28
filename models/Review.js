import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    rating: {
        type: String,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    }
})

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema)

export default Review