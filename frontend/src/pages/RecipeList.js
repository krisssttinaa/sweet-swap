import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import AddRecipe from '../components/AddRecipe';
import './RecipeList.css';

const RecipeList = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const { category: routeCategory } = useParams();
  const [showAddRecipe, setShowAddRecipe] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get(`http://88.200.63.148:8288/api/recipes${category || routeCategory ? `/category/${category || routeCategory}` : ''}`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }, [category, routeCategory]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div className="recipe-list">
      <div className="recipe-header">
        <h2>{category || routeCategory ? `${category || routeCategory} Recipes` : 'All Recipes'}</h2>
        <button onClick={() => setShowAddRecipe(true)}>+ Add Recipe</button>
      </div>
      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.recipe_id} recipe={recipe} fetchRecipes={fetchRecipes} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
      {showAddRecipe && <AddRecipe onClose={() => setShowAddRecipe(false)} />}
    </div>
  );
};

export default RecipeList;