import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../useAuth';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const isAuthenticated = useAuth();
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [first_name, setFirstname] = useState(localStorage.getItem('first_name') || '');
  const [last_name, setLastname] = useState(localStorage.getItem('last_name') || '');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Navigate to="/home" />;
  }

    const handleSave = async () => {
      try {
          const response = await axios.put('http://localhost:8002/api/edit_profile/', {
              username,
              email,
              first_name,
              last_name
          }, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
          });

          localStorage.setItem('username', response.data.username);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('first_name', response.data.first_name);
          localStorage.setItem('last_name', response.data.last_name);

          setIsEditing(false);
      } catch (error) {
          console.error("Error updating profile:", error.response.data);
      }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">User Profile</h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            readOnly={!isEditing}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
            readOnly={!isEditing}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            readOnly={!isEditing}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!isEditing}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="flex justify-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ml-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
