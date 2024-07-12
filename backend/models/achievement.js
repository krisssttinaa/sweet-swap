const conn = require('../config/db');

const dataPool = {};

dataPool.getAllAchievements = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM achievements`, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.getAchievementById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM achievements WHERE achievement_id = ?`, [id], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.createAchievement = (user_id, achievement_name, description, date_achieved) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO achievements (user_id, achievement_name, description, date_achieved) VALUES (?, ?, ?, ?)`, [user_id, achievement_name, description, date_achieved], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

module.exports = dataPool;
