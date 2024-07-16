const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts();
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.getPostById(req.params.id);
        if (!post.length) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createPost = async (req, res) => {
    const { user_id, recipe_id, content } = req.body;
    try {
        const newPost = await Post.createPost({
            user_id,
            recipe_id,
            content,
            date_posted: new Date()
        });
        res.json(newPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.deletePost(req.params.id);
        res.json({ msg: 'Post deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};