import Post from "../models/PostModel.js";

// Create new post
export const createPost = async (req, res) => {
    try {
        console.log(req.body);
        const title = req.body.title;
        if (!title) {
            res.status(400).json('No title provided.');
            return;
        }
        let summary = '';
        let content = '';
        let image = '';
        if (req.body.summary) summary = req.body.summary;
        if (req.body.content) content = req.body.content;
        if (req.body.image) image = req.body.image;
        const PostDoc = await Post.create({
            title,
            summary,
            content,
            image,
            author: req.user.id
        });

        if (!PostDoc) {
            res.status(400).json(`Some error occured while creating the post.`)
        } else {
            res.status(200).json(PostDoc);
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

// Get recent posts
export const getRecent = async (req, res) => {
    try {
        const recent = await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json(recent);
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

// Get post by id
export const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const postInfo = await Post.findById(id).populate('author', ['username']);
        res.status(200).json(postInfo);
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


// Update post by id
export const updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        const reqPost = await Post.findById(id);

        if (!reqPost) {
            res.status(400).json('No such post exists.');
            return;
        }

        console.log(req.user.id)
        console.log(reqPost)
        const isAuthor = JSON.stringify(req.user.id) === JSON.stringify(reqPost.author);

        if (!isAuthor) {
            res.status(400).json('Unauthorized access.');
            return;
        }

        if (req.body.title) reqPost.title = req.body.title;
        if (req.body.summary) reqPost.summary = req.body.summary;
        if (req.body.content) reqPost.content = req.body.content;
        if (req.body.image) reqPost.image = req.body.image;

        reqPost.save();

        res.status(200).json(reqPost);

    } catch (err) {
        res.status(500).json({ msg: err });
    }
}

// Delete post by id
export const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const reqPost = await Post.findById(id);

        if (!reqPost) {
            res.status(400).json('No such post exists.');
            return;
        }

        const isAuthor = JSON.stringify(req.user.id) === JSON.stringify(reqPost.author);

        if (!isAuthor) {
            res.status(400).json('Unauthorized access.');
            return;
        }

        const deleted = await Post.deleteOne(reqPost);

        if (!deleted) {
            res.status(400).json(`Couldn't delete post.`);
        } else {
            res.status(200).json('Post successfully deleted.')
        }

    } catch (err) {
        res.status(500).json({ msg: err });
    }
}