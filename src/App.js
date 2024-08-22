import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import PrivateRoute from './Components/PrivateRoute';
import { useAuth } from './useAuth';

function App() {
  const isAuthenticated = useAuth();

  // Wait for the authentication check to complete
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route
            path="/home"
            element={<PrivateRoute element={Home} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
