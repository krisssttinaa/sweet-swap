const conn = require('../config/db');
const dataPool = {};

dataPool.getAllComments = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM comments`, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.getCommentById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM comments WHERE comment_id = ?`, [id], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.createComment = (post_id, user_id, content, date_commented) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO comments (post_id, user_id, content, date_commented) VALUES (?, ?, ?, ?)`, [post_id, user_id, content, date_commented], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

module.exports = dataPool;