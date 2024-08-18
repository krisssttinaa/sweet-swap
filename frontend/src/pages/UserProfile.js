import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.css';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get(`http://88.200.63.148:8288/api/users/${id}`);
        setUser(userResponse.data);

        const recipesResponse = await axios.get(`http://88.200.63.148:8288/api/recipes`);
        setRecipes(recipesResponse.data.filter((recipe) => recipe.user_id === parseInt(id)));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>{user.username}'s Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Surname:</strong> {user.surname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Dietary Goals:</strong> {user.dietary_goals || 'Not specified'}</p>
        <p><strong>Country:</strong> {user.country || 'Not specified'}</p>
      </div>
      <h3>{user.username}'s Recipes</h3>
      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="recipe-item"
              onClick={() => handleRecipeClick(recipe.recipe_id)}
            >
              {recipe.image_filename && (
                <img
                  src={`http://88.200.63.148:8288/uploads/${recipe.image_filename}`}
                  alt={recipe.title}
                  className="recipe-image"
                />
              )}
              <div className="recipe-content">
                <h4>{recipe.title}</h4>
                <p>{recipe.instructions.substring(0, 100)}...</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;