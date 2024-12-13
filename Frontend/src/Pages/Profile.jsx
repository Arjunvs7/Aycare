import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Simulate fetching current user data when the component loads
    const fetchUserData = async () => {
      try {
        // Replace with your API endpoint to fetch the logged-in user's data
        const response = await axios.get('/api/user'); // This assumes your backend API returns the user data
        const user = response.data;

        // Fill form data with the fetched user data
        setFormData({
          name: user.name || '', // Default to empty string if no name
          email: user.email || '', // Default to empty string if no email
          password: '******', // Don't show the real password, just a placeholder
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      // Send updated user data to the backend
      const response = await axios.put('/api/user', formData); // Replace with your actual API endpoint

      if (response.status === 200) {
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Error updating profile.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <div className="profile-item">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{formData.name}</span>
          )}
        </div>
        <div className="profile-item">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{formData.email}</span>
          )}
        </div>
        <div className="profile-item">
          <label>Password:</label>
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          ) : (
            <span>{formData.password}</span> // Display the placeholder
          )}
        </div>
      </div>
      <div className="profile-actions">
        <button onClick={handleEditClick}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && (
          <button onClick={handleSaveClick} className="save-button">
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
