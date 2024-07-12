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
    const { post_id, user_id, content, date_commented } = req.body;
    try {
        const newComment = await Comment.createComment(post_id, user_id, content, date_commented);
        res.json(newComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};