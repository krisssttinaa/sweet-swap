import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState('default.png');
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '', 
    dietaryGoals: '',
  });
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userIdToFetch = id || loggedInUserId; 
        const response = await axios.get(`http://88.200.63.148:8288/api/users/${userIdToFetch}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setSelectedPicture(response.data.profile_picture || 'default.png');

        if (!id) {
          setFormData({
            name: response.data.name,
            surname: response.data.surname,
            email: response.data.email,
            password: '********',
            dietaryGoals: response.data.dietary_goals || '',
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [id, loggedInUserId, navigate]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        try {
          const response = await axios.get('http://88.200.63.148:8288/api/recipes');
          setRecipes(response.data.filter((recipe) => recipe.user_id === user.user_id));
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      }
    };

    fetchRecipes();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePictureSelect = (picture) => {
    setSelectedPicture(picture);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('token');
    const updateData = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        dietaryGoals: formData.dietaryGoals,
        profilePicture: selectedPicture,  // Ensure this is being sent
    };

    if (formData.password !== '********' && formData.password !== '') {
        updateData.password = formData.password;
    }

    try {
        await axios.put('http://88.200.63.148:8288/api/users/profile', updateData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
            ...user,
            ...updateData,
            dietary_goals: updateData.dietaryGoals,
            profile_picture: updateData.profilePicture, // Ensure this is updated locally
        });
        setIsEditing(false);
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};

  const handleCancelClick = () => {
    setFormData({
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: '********',
      dietaryGoals: user.dietary_goals || '',
    });
    setSelectedPicture(user.profile_picture || 'default.png');
    setIsEditing(false);
  };

  const openPictureModal = () => {
    setIsPictureModalOpen(true);
  };

  const closePictureModal = () => {
    setIsPictureModalOpen(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const isCurrentUser = user.user_id === parseInt(loggedInUserId);

  return (
    <div className="profile-page">
      <h2>{isCurrentUser ? 'Profile' : `${user.username}'s Profile`}</h2>
      {isCurrentUser && isEditing ? (
        <div className="edit-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter new password or leave blank"
          />
          <label>Dietary Goals:</label>
          <textarea
            name="dietaryGoals"
            value={formData.dietaryGoals}
            onChange={handleInputChange}
            rows="3"
            placeholder="Enter your dietary goals"
            className="textarea-dietary-goals"
          />
          
          <label>Select Profile Picture:</label>
          <img 
            src={`http://88.200.63.148:8288/uploads/${selectedPicture}`} 
            alt="Profile"
            className="profile-picture"
            onClick={openPictureModal}
          />

          <div className="button-group">
            <button className="save" onClick={handleSaveClick}>Save</button>
            <button className="cancel" onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="profile-info">
          <img 
            src={`http://88.200.63.148:8288/uploads/${user.profile_picture || 'default.png'}`} 
            alt="Profile"
            className="profile-picture"
          />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Surname:</strong> {user.surname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Dietary Goals:</strong> {user.dietary_goals || 'Not specified'}</p>
          {!id && <button className="edit" onClick={handleEditClick}>Edit</button>}
        </div>
      )}

      <h3>{isCurrentUser ? 'My Recipes' : `${user.username}'s Recipes`}</h3>
      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="recipe-item"
              onClick={() => navigate(`/recipe/${recipe.recipe_id}`)}
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

      {isPictureModalOpen && (
        <div className="picture-modal">
          <div className="picture-grid">
            {['profile1.png', 'profile2.png', 'profile3.png', 'profile4.png', 'profile5.png', 'profile6.png', 
            'profile7.png', 'profile8.png', 'profile9.png', 'profile10.png', 'profile11.png', 'profile12.png'].map((pic) => (
              <img 
                key={pic} 
                src={`http://88.200.63.148:8288/uploads/${pic}`} 
                alt="Profile Option" 
                className={`picture-option ${selectedPicture === pic ? 'selected' : ''}`}
                onClick={() => handlePictureSelect(pic)}
              />
            ))}
          </div>
          <div className="modal-actions">
            <button onClick={closePictureModal}>Close</button>
            <button onClick={closePictureModal} className="save">Save Selection</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;