import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        summary: String,
        content: String,
        image: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
    timestamps: true
}
);

const Post = mongoose.model('Post', PostSchema);

export default Post;