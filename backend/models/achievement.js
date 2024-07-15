const conn = require('../config/db');

const Achievement = {};

Achievement.getAllAchievements = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM achievements', (err, res) => {
            if (err) {
                console.error('Error fetching all achievements:', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Achievement.getAchievementById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM achievements WHERE achievement_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error fetching achievement with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Achievement.createAchievement = (achievementData) => {
    const { user_id, achievement_name, description, date_achieved } = achievementData;
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO achievements (user_id, achievement_name, description, date_achieved) VALUES (?, ?, ?, ?)',
            [user_id, achievement_name, description, date_achieved],
            (err, res) => {
                if (err) {
                    console.error('Error creating achievement:', err);
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

module.exports = Achievement;