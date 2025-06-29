import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    try {
      // Special case: Auto-authenticate admin user
      if (email === "mahmuddoktir@gmail.com" && password === "Mahmud1998.") {
        const adminUserData = {
          id: "admin-001",
          email: "mahmuddoktir@gmail.com",
          name: "Admin User",
          userType: "admin",
          token: "admin-token-" + Date.now(),
        };

        setUser(adminUserData);
        localStorage.setItem("user", JSON.stringify(adminUserData));
        return { success: true };
      }

      // Regular API login for other users
      const data = await authAPI.login({ email, password, userType });
      
      // Handle different possible response structures
      const userData = {
        id: data.user?.id || data.id,
        email: data.user?.email || data.email,
        name: data.user?.name || data.name,
        userType: data.user?.userType || data.userType || userType,
        token: data.token || data.access_token || data.accessToken,
      };

      // Validate that we have the required data
      if (!userData.token) {
        throw new Error("No authentication token received from server");
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Special case: Auto-register admin user
      if (userData.email === "mahmuddoktir@gmail.com" && userData.password === "Mahmud1998.") {
        const adminUserData = {
          id: "admin-001",
          email: "mahmuddoktir@gmail.com",
          name: userData.name || "Admin User",
          userType: "admin",
          token: "admin-token-" + Date.now(),
        };

        setUser(adminUserData);
        localStorage.setItem("user", JSON.stringify(adminUserData));
        return { success: true, data: adminUserData };
      }

      // Regular API registration for other users
      const data = await authAPI.register(userData);
      return { success: true, data };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
