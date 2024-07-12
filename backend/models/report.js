const conn = require('../config/db');
const dataPool = {};

dataPool.getAllReports = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM reports`, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.getReportById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM reports WHERE report_id = ?`, [id], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.createReport = (user_id, post_id, reason, date_reported) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO reports (user_id, post_id, reason, date_reported) VALUES (?, ?, ?, ?)`, [user_id, post_id, reason, date_reported], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

module.exports = dataPool;