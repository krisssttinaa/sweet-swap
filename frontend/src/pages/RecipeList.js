import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import AddRecipe from './AddRecipe';
import './RecipeList.css';

const RecipeList = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const { category: routeCategory } = useParams();
  const [showAddRecipe, setShowAddRecipe] = useState(false);  // State for showing Add Recipe form
  const [selectedTab, setSelectedTab] = useState('all');      // State for selected tab
  const [isLoggedIn, setIsLoggedIn] = useState(false);        // State to track if the user is logged in

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchRecipes = useCallback(async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    try {
      let response;
      if (selectedTab === 'saved') {
        response = await axios.get('http://88.200.63.148:8288/api/saved/saved', {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else if (selectedTab === 'my') {
        if (!userId) {
          console.error('No user ID found. Cannot fetch user-specific recipes.');
          return;
        }
        response = await axios.get('http://88.200.63.148:8288/api/recipes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        response = {
          data: response.data.filter(recipe => recipe.user_id === parseInt(userId))
        };
      } else {
        response = await axios.get(`http://88.200.63.148:8288/api/recipes${category || routeCategory ? `/category/${category || routeCategory}` : ''}`);
      }

      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }, [category, routeCategory, selectedTab]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes, selectedTab]);

  return (
    <div className="recipe-list">
      <div className="tabs">
        <button className={selectedTab === 'saved' ? 'active' : ''} onClick={() => setSelectedTab('saved')}>Saved Recipes</button>
        <button className={selectedTab === 'all' ? 'active' : ''} onClick={() => setSelectedTab('all')}>All Recipes</button>
        <button className={selectedTab === 'my' ? 'active' : ''} onClick={() => setSelectedTab('my')}>My Recipes</button>
      </div>
      <div className="recipe-header">
        <h2>{selectedTab === 'saved' ? 'Saved Recipes' : selectedTab === 'my' ? 'My Recipes' : 'All Recipes'}</h2>
        {isLoggedIn && (
          <button className="add-recipe-button" onClick={() => setShowAddRecipe(true)}>+ Add Recipe</button>
        )}
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
      {showAddRecipe && <AddRecipe onClose={() => setShowAddRecipe(false)} fetchRecipes={fetchRecipes} />}
    </div>
  );
};

export default RecipeList;