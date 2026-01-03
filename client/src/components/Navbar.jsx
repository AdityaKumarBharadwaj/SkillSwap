import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { LogOut, Menu, User } from "lucide-react";
import logo from "../assets/logo.png"


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-[#fffcf9] shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-15 w-auto object-contain" />
              <div className="bg-primary p-2 rounded-lg">
                <Menu className="h-6 w-6 text-white"></Menu>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                SkillSwap
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden md:flex flex-col items-end mr-2">
                  <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.timeCredits} Credits</span>
                </div>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="text-gray-950 bg-gray-50 rounded hover:text-primary hover:bg-indigo-600 hover:text-white font-medium px-3 py-2">
                  Login
                </Link>
                <Link to="/register" className="bg-green-300 hover:bg-indigo-700 text-black px-5 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-200">
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
