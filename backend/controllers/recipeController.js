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
    const recipeData = req.body;
    try {
        const result = await Recipe.createRecipe(recipeData);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};