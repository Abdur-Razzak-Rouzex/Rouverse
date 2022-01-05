import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName:  {
        type: String,
        required: true
    },
    textStatus:  {
        type: String,
        required: true
    },
    userImg:  {
        type: String,
        required: true
    },
    postImg:  {
        type: String,
        required: true
    },
    totalLikes: {
        type: Number,
        required: true,
        default: 5
    },
}, {
    timestamps: true
})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;