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
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createPost = async (req, res) => {
    const postData = req.body;
    try {
        const result = await Post.createPost(postData);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};