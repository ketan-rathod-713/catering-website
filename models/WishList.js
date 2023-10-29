import mongoose from "mongoose";

const wishListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: true
    }
})

const WishList = mongoose.models.WishList || mongoose.model("WishList", wishListSchema);

export default WishList;


