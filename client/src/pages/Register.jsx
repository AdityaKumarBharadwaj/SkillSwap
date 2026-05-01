import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, MapPin, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.location
    );
    setLoading(false);
    
    if (result.success) {
      toast.success("Account created successfully!");
      navigate("/"); 
    } else {
      toast.error(result.error || "Registration failed"); 
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 w-full h-full bg-gray-50"></div>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-72 h-72 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-72 h-72 rounded-full bg-purple-300 opacity-20 blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 glass p-10 rounded-3xl shadow-2xl z-10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Join the Community</h2>
          <p className="mt-2 text-sm text-gray-600 font-medium">
            Start earning time credits today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <User className="h-5 w-5" />
              </div>
              <input
                name="name"
                type="text"
                required
                className="appearance-none block w-full pl-11 px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 bg-white/50 backdrop-blur-sm sm:text-sm transition-all"
                placeholder="Full Name"
                onChange={handleChange}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none block w-full pl-11 px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 bg-white/50 backdrop-blur-sm sm:text-sm transition-all"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <Lock className="h-5 w-5" />
              </div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none block w-full pl-11 px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 bg-white/50 backdrop-blur-sm sm:text-sm transition-all"
                placeholder="Password (min 6 chars)"
                onChange={handleChange}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <MapPin className="h-5 w-5" />
              </div>
              <input
                name="location"
                type="text"
                required
                className="appearance-none block w-full pl-11 px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 bg-white/50 backdrop-blur-sm sm:text-sm transition-all"
                placeholder="Neighborhood (e.g. Downtown)"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors">
              Sign in instead
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;