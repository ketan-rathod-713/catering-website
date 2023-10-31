import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    photoURL: {
        type: String,
        default: "https://picsum.photos/200/300"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    registrationDate: { // to track no of users added in given time frame
        type: Date,
        default: new Date(),
        required: true
    },
    lastTimeWhenVisitedSite: {
        type: Date,
        default: new Date(),
        required: true
    }
})

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;


