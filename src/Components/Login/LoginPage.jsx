import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../useAuth';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const isAuthenticated = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    if (isAuthenticated) {
      return <Navigate to="/home" />;
    }
  
    const handleSignUpClick = () => {
      navigate('/signup');
    };

    const handleLogin = async (credentials) => {
      try {
          const response = await axios.post('http://127.0.0.1:8002/api/login/', {
              username,
              password,
          });
  
          console.log('Response data:', response.data);
  
          if (response.data) {
              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('username', response.data.username);
              localStorage.setItem('email', response.data.email);
              localStorage.setItem('first_name', response.data.first_name);
              localStorage.setItem('last_name', response.data.last_name);
  
              navigate('/home');
          }
      } catch (error) {
          console.error('Login failed:', error);
          setError(error.response?.data?.error || 'Login failed');
      }
  };
  
  
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-xs">
        <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin({ username, password });
          }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username"
                id="username"
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => handleLogin({ username, password })}
              >
                Sign In
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                className="text-blue-500 hover:text-blue-700"
                type="button"
                onClick={handleSignUpClick}
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default LoginPage;