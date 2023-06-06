import Post from "../models/PostModel.js";

export const createPost = async (req, res) => {
    try {
        // console.log(req.user);
        const title = req.body.title;
        if(!title) {
            res.status(400).json('No title provided.');
            return;
        }
        let summary = '';
        let content = '';
        let image = '';
        if(req.body.summary) summary = req.body.summary;
        if(req.body.content) content = req.body.content;
        if(req.body.picturePath) image = req.body.picturePath;
        const PostDoc = await Post.create({
            title,
            summary,
            content,
            image,
            author: req.user.id
        });

        if(!PostDoc) {
            res.status(400).json(`Some error occured while creating the post.`)
        } else {
            res.status(200).json(PostDoc);
        }
    } catch(err) {
        res.status(500).json({msg: err});
    }
};