const conn = require('../config/db');
const dataPool = {};

dataPool.getAllPosts = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM posts`, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.getPostById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM posts WHERE post_id = ?`, [id], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.createPost = (user_id, recipe_id, content, date_posted) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO posts (user_id, recipe_id, content, date_posted) VALUES (?, ?, ?, ?)`, [user_id, recipe_id, content, date_posted], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

module.exports = dataPool;