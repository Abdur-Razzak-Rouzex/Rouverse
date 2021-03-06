import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    userImg: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;