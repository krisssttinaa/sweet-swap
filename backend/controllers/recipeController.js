const Recipe = require('../models/recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.getAllRecipes();
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.getRecipeById(req.params.id);
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createRecipe = async (req, res) => {
    const { user_id, title, product_id, ingredients, instructions, date_created } = req.body;
    try {
        const newRecipe = await Recipe.createRecipe(user_id, title, product_id, ingredients, instructions, date_created);
        res.json(newRecipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};