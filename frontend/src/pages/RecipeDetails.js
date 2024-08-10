import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://88.200.63.148:8288/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

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
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://88.200.63.148:8288/api/recipes/${recipe.recipe_id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      navigate('/recipes');
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

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details">
      <img src={`data:image/jpeg;base64,${Buffer.from(recipe.image.data).toString('base64')}`} alt={recipe.title} />
      <div className="recipe-info">
        <h2>{recipe.title}</h2>
        {recipe.products && recipe.products.length > 0 && (
          <>
            <h3>Products</h3>
            <ul className='products-txt'>
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
        <p className='instructions-txt'>{recipe.instructions}</p>
      </div>
      <div className="menu" onClick={toggleMenu} ref={menuRef}>
      <div className="burger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
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

export default RecipeDetails;