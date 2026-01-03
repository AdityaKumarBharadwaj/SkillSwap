import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
// import {Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddSkill from './pages/AddSkill'

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />}/>
              <Route path='/add-skill' element={<AddSkill />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App