import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
    }
})

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;


