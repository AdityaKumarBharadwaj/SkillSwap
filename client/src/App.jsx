import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // send request to the backend
      const {data} = await axios.post("http://localhost:5000/api/auth/login",
        {
          email,
          password
        });

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        return {success: true};
    }catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed"
      };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value = {{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;