import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState(''); // Add category state
  const [image, setImage] = useState(null);
  const navigate = useNavigate();  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id'); 
    const formData = new FormData();
    formData.append('title', title);
    formData.append('instructions', instructions);
    formData.append('category', category); // Append category to the formData
    formData.append('date_created', new Date().toISOString()); // Set current date as date_created
    if (image) formData.append('image', image);
    formData.append('user_id', userId); 
  
    try {
      await axios.post('http://88.200.63.148:8288/api/recipes/create', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      navigate('/recipes');  
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };    

  return (
    <div className="add-recipe-container">
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <h2>Add a New Recipe</h2>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Instructions</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        <label>Category</label> {/* Add category input */}
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="add-recipe-button">Add Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;