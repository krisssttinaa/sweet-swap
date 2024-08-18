import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://88.200.63.148:8288/api/recipes/${id}`);
        setRecipe(response.data);

        if (response.data.user_id) {
          const userResponse = await axios.get(`http://88.200.63.148:8288/api/users/${response.data.user_id}`);
          setUsername(userResponse.data.username);
        }

        if (token) {
          const savedResponse = await axios.get(`http://88.200.63.148:8288/api/saved/saved`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const savedRecipes = savedResponse.data;
          setIsSaved(savedRecipes.some(savedRecipe => savedRecipe.recipe_id === response.data.recipe_id));
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id, token]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.recipe_id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://88.200.63.148:8288/api/recipes/${recipe.recipe_id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      navigate('/recipes');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('http://88.200.63.148:8288/api/saved/save', { recipeId: recipe.recipe_id }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving recipe', error);
    }
  };

  const handleUnsave = async () => {
    try {
      await axios.delete('http://88.200.63.148:8288/api/saved/unsave', {
        data: { recipeId: recipe.recipe_id },
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setIsSaved(false);
    } catch (error) {
      console.error('Error unsaving recipe', error);
    }
  };

  const handleReport = () => {
    // Add report logic here
  };

  const handleUsernameClick = () => {
    const profilePath = userId === recipe.user_id.toString() ? '/profile' : `/user/${recipe.user_id}`;
    navigate(profilePath); // Navigate to the appropriate profile page
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details">
      <img src={`http://88.200.63.148:8288/uploads/${recipe.image_filename}`} alt={recipe.title} />
      <div className="recipe-info">
        <h2>{recipe.title}</h2>
        <p className="author">
          Created by: <span onClick={handleUsernameClick} className="username">{username}</span>
        </p>
        {recipe.products && recipe.products.length > 0 && (
          <>
            <h3>Products</h3>
            <ul className="products-txt">
              {recipe.products.map((product) => (
                <li key={product.product_id}>
                  <strong>{product.name}</strong> - {product.quantity}
                  <br />
                  <em>{product.description}</em>
                  <br />
                  Price: {product.price}, Brand: {product.brand}, Shop: {product.shop}
                </li>
              ))}
            </ul>
          </>
        )}
        <h3>Instructions</h3>
        <p className="instructions-txt">{recipe.instructions}</p>
      </div>
      {userId && token && (
        <div className="menu" onClick={toggleMenu} ref={menuRef}>
          <div className="burger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          {menuOpen && (
            <div className="menu-options">
              {userId === recipe.user_id.toString() && <div onClick={handleEdit}>Edit</div>}
              {userId === recipe.user_id.toString() && <div onClick={handleDelete}>Delete</div>}
              {isSaved 
                ? <div onClick={handleUnsave}>Unsave</div> 
                : <div onClick={handleSave}>Save</div>
              }
              <div onClick={handleReport}>Report</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;