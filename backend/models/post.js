const conn = require('../config/db');

const Post = {};

Post.getAllPosts = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Post', (err, res) => {
            if (err) {
                console.error('Error fetching all posts:', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Post.getPostById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Post WHERE post_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error fetching post with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Post.createPost = (postData) => {
    const { user_id, recipe_id, content, date_posted } = postData;
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO Post (user_id, recipe_id, content, date_posted) VALUES (?, ?, ?, ?)',
            [user_id, recipe_id, content, date_posted],
            (err, res) => {
                if (err) {
                    console.error('Error creating post:', err);
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

Post.deletePost = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Post WHERE post_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error deleting post with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

module.exports = Post;
