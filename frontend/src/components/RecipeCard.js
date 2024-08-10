import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, fetchRecipes }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.recipe_id}`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://88.200.63.148:8288/api/recipes/${recipe.recipe_id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleSave = () => {
    // Add save logic here
  };

  const handleReport = () => {
    // Add report logic here
  };

  const handleViewRecipe = () => {
    navigate(`/recipe/${recipe.recipe_id}`);
  };

  return (
    <div className="recipe-card" onClick={handleViewRecipe}>
      {recipe.image && (
        <img
          src={`data:image/jpeg;base64,${Buffer.from(recipe.image.data).toString('base64')}`}
          alt={recipe.title}
          className="recipe-image"
        />
      )}
      <div className="recipe-content">
        <h4>{recipe.title}</h4>
        <p>{recipe.instructions.substring(0, 100)}...</p>
      </div>
      <div className="menu" onClick={(e) => {e.stopPropagation(); toggleMenu();}}>
        ...
        {menuOpen && (
          <div className="menu-options">
            {user && user.user_id === recipe.user_id && <div onClick={handleEdit}>Edit</div>}
            {user && user.user_id === recipe.user_id && <div onClick={handleDelete}>Delete</div>}
            <div onClick={handleSave}>Save</div>
            <div onClick={handleReport}>Report</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;