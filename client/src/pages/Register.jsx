import { useState, useContext } from "react";
// We import the central data store (AuthContext) so we can use the 'register' function
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, MapPin, ArrowRight } from "lucide-react";

const Register = () => {
  // 1. GET TOOLS
  // Get the 'register' function from our AuthContext (the app's brain)
  const { register } = useContext(AuthContext);
  // Get the 'navigate' tool to move the user to a different page later
  const navigate = useNavigate();

  // 2. CREATE MEMORY (STATE)
  // This 'formData' variable holds whatever the user is typing right now.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });
  
  // This variable holds any error message (like "Email already taken")
  const [error, setError] = useState("");

  // 3. HANDLE TYPING
  // This function runs every time the user types a letter.
  // It updates 'formData' to match what is in the box.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. HANDLE SUBMIT
  // This runs when the user clicks the "Create Account" button.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing automatically
    
    // Call the register function to send data to the server
    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.location
    );
    
    // Check if it worked
    if (result.success) {
      navigate("/"); // Success! Go to the Home page
    } else {
      setError(result.error); // Failed! Show the error message on screen
    }
  };

  // 5. THE VISUALS (HTML/JSX)
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        
        {/* The Title Section */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Join the Community</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start earning time credits today
          </p>
        </div>

        {/* The Error Box - Only shows up if there is an error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* The Form Section */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Name Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all"
                placeholder="Full Name"
                onChange={handleChange} // Call handleChange when typing
              />
            </div>

            {/* Email Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>

            {/* Password Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all"
                placeholder="Password (min 6 chars)"
                onChange={handleChange}
              />
            </div>

            {/* Location Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="location"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all"
                placeholder="Neighborhood (e.g. Downtown)"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* The Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-amber-900 bg-primary hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-indigo-200"
          >
            Create Account
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Link to Login if they already have an account */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-indigo-500">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;