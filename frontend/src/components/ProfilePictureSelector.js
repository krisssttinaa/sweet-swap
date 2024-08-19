import React, { useState } from 'react';
import axios from 'axios';

const ProfilePictureSelector = () => {
    const [selectedPicture, setSelectedPicture] = useState('default.png');

    const profilePictures = [
        'profile1.png', 'profile2.png', 'profile3.png',
        'profile4.png', 'profile5.png', 'profile6.png',
        'profile7.png', 'profile8.png', 'profile9.png',
        'default.png'
    ];

    const handlePictureSelect = (picture) => {
        setSelectedPicture(picture);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://your-backend-url/api/profile-picture', { profilePicture: selectedPicture }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Profile picture updated successfully!');
        } catch (error) {
            console.error('Error updating profile picture:', error);
            alert('Failed to update profile picture');
        }
    };

    return (
        <div>
            <h3>Select Your Profile Picture</h3>
            <div className="profile-picture-grid">
                {profilePictures.map(picture => (
                    <img 
                        key={picture} 
                        src={`/images/profile_pictures/${picture}`} 
                        alt="Profile" 
                        className={`profile-picture ${selectedPicture === picture ? 'selected' : ''}`}
                        onClick={() => handlePictureSelect(picture)}
                    />
                ))}
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default ProfilePictureSelector;
