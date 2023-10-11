import mongoose, { mongo } from "mongoose";

const gallaryPhotoSchema = mongoose.Schema({
    url: {
        type: "String",
        required: true
    },
    alt: {
        type: "String",
        default: "No Alt text available"
    }
})

const GallaryPhoto = mongoose.models.GallaryPhoto || new mongoose.model("GallaryPhoto", gallaryPhotoSchema);

export default GallaryPhoto;