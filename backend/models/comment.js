const conn = require('../config/db');

const Comment = {};

Comment.getAllComments = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM comments', (err, res) => {
            if (err) {
                console.error('Error fetching all comments:', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Comment.getCommentById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM comments WHERE comment_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error fetching comment with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Comment.createComment = (commentData) => {
    const { post_id, user_id, content, date_commented } = commentData;
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO comments (post_id, user_id, content, date_commented) VALUES (?, ?, ?, ?)',
            [post_id, user_id, content, date_commented],
            (err, res) => {
                if (err) {
                    console.error('Error creating comment:', err);
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

module.exports = Comment;