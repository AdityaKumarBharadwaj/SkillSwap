/**
 * @file App.jsx
 * @description The root component of the SkillSwap application.
 * It sets up the global providers (AuthContext), routing configuration,
 * and the main application layout structure.
 * @module App
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddSkill from './pages/AddSkill';

/**
 * App Component
 * * Serves as the entry point for the component tree.
 * - Wraps the application in `AuthProvider` to provide global user state.
 * - Wraps the application in `Router` to enable client-side navigation.
 * - Defines the main layout (Navbar + Page Content) and route definitions.
 * * @returns {JSX.Element} The complete application tree.
 */

const App = () => {
  return (
    <div>
      {/* AuthProvider: Provides 'user', 'login', 'register', 'logout' 
        to all child components via React Context.
      */}
      <AuthProvider>
        <Router>
          {/* Main Layout Container: Ensures full height and consistent background */}
          <div className="min-h-screen bg-gray-50 font-sans">
            
            {/* Navigation Bar: Persists across all pages */}
            <Navbar />
            
            {/* Route Definitions: Renders specific pages based on URL */}
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              
              {/* Protected Routes (Logic handled inside pages or middleware) */}
              <Route path='/add-skill' element={<AddSkill />} />
            </Routes>
            
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;