import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type:String,
        required: true
    }
})

const Image = mongoose.models.Image || new mongoose.model("Image", imageSchema);

export default Image;