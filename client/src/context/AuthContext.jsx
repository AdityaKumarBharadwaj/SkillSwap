import { createContext, useState, useEffect } from "react";
import axios from "axios";

// 1. CREATE THE CONTEXT
// This creates a "global box" where we can store user info.
const AuthContext = createContext();

// 2. THE PROVIDER (THE WRAPPER)
// This component wraps your whole app so every page can access the user info.
export const AuthProvider = ({ children }) => {
  // This variable holds the current user's data. If it is null, no one is logged in.
  const [user, setUser] = useState(null);

  // 3. REMEMBER ME (STARTUP CHECK)
  // This runs once when the website loads.
  // It checks the browser's storage (Local Storage) to see if a user is already saved there.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // If found, log them in automatically!
    }
  }, []);

  // 4. LOGIN FUNCTION
  // Use this when an existing user wants to sign in.
  const login = async (email, password) => {
    try {
      // Send email/password to your backend server
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      
      // If correct, save the user info in our state variable
      setUser(data);
      // Also save it to the browser's storage so they stay logged in if they refresh
      localStorage.setItem("user", JSON.stringify(data));
      
      return { success: true }; // Tell the login page "It worked!"
    } catch (error) {
      // If it failed (wrong password), return the error message
      return { 
        success: false, 
        error: error.response?.data?.message || "Login failed" 
      };
    }
  };

  // 5. REGISTER FUNCTION
  // Use this when a new person wants to create an account.
  const register = async (name, email, password, location) => {
    try {
      // Send the new details to the backend to create the user
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        location
      });
      
      // If successful, log them in immediately
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Registration failed" 
      };
    }
  };

  // 6. LOGOUT FUNCTION
  // Clears the user data to sign them out.
  const logout = () => {
    setUser(null); // Clear the state
    localStorage.removeItem("user"); // Clear the browser storage
  };

  // 7. SHARE THE TOOLS
  // This part actually shares the 'user' data and the functions (login, register, logout)
  // with the rest of your app.
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;