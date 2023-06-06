import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        title: String,
        summary: String,
        content: String,
        image: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
    timestamps: true
}
);

const Post = mongoose.model('Post', PostSchema);

export default Post;