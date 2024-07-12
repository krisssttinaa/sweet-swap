const conn = require('../config/db');
const dataPool = {};

dataPool.getAllRecipes = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM recipes`, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.getRecipeById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM recipes WHERE recipe_id = ?`, [id], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

dataPool.createRecipe = (user_id, title, product_id, ingredients, instructions, date_created) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO recipes (user_id, title, product_id, ingredients, instructions, date_created) VALUES (?, ?, ?, ?, ?, ?)`, [user_id, title, product_id, ingredients, instructions, date_created], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

module.exports = dataPool;