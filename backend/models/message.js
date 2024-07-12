const conn = require('../config/db');
const dataPool = {};

dataPool.getAllMessages = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM messages`, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.getMessageById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM messages WHERE message_id = ?`, [id], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.createMessage = (sender_id, receiver_id, content, date_sent) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO messages (sender_id, receiver_id, content, date_sent) VALUES (?, ?, ?, ?)`, [sender_id, receiver_id, content, date_sent], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

module.exports = dataPool;