import React, { useState } from 'react';
import axios from 'axios';
import './AddRecipe.css';

const AddRecipe = ({ onClose, fetchRecipes }) => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('instructions', instructions);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://88.200.63.148:8288/api/recipes', formData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      fetchRecipes();
      onClose();
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className="add-recipe-modal">
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Instructions</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Add Recipe</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddRecipe;