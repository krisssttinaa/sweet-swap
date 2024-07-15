const Comment = require('../models/comment');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getAllComments();
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.getCommentById(req.params.id);
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createComment = async (req, res) => {
    const commentData = req.body;
    try {
        const result = await Comment.createComment(commentData);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};