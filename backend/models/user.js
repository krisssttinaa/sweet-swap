const conn = require('../config/db');

const dataPool = {};

dataPool.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users`, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users WHERE user_id = ?`, [id], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.createUser = (username, password, email, name, surname, country, role, dietary_goals, registration_date, amount_achievements) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO users (username, password, email, name, surname, country, role, dietary_goals, registration_date, amount_achievements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [username, password, email, name, surname, country, role, dietary_goals, registration_date, amount_achievements], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.authUser = (username) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users WHERE username = ?`, [username], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

module.exports = dataPool;