const conn = require('../config/db');
const dataPool = {};

dataPool.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM products`, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM products WHERE product_id = ?`, [id], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.createProduct = (product_name, description, price) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO products (product_name, description, price) VALUES (?, ?, ?)`, [product_name, description, price], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

module.exports = dataPool;