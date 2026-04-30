/**
 * @file Navbar.jsx
 * @description Main navigation component for the SkillSwap application. 
 * Handles user authentication state display (Login/Logout) and navigation links.
 * @module Components/Navbar
 */


import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";
import logo from "../assets/logo.png"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass shadow-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="" className="h-10 w-auto object-contain rounded-xl group-hover:scale-105 transition-transform" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                SkillSwap
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/profile" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${location.pathname === '/profile' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <UserIcon size={18} />
                    <span className="hidden sm:inline">Profile</span>
                </Link>
                <div className="hidden md:flex flex-col items-end mx-2">
                  <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                  <span className="text-xs font-bold text-indigo-600">{user.timeCredits} Credits</span>
                </div>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:text-indigo-600 font-medium px-4 py-2 transition-all shadow-sm">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-md shadow-indigo-200">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;