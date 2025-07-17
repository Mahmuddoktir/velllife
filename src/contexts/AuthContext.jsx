import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Initialize user data from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear corrupted data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ✅ REGISTER
  const register = async (formData) => {
    setLoading(true);
    try {
      const response = await authAPI.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // If your API returns a token and user data, handle it here. If not, adjust as needed.
      // For now, just return the response.
      return { success: true, data: response };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.message || "Registration failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN
  const login = async (email, password, userType) => {
    setLoading(true);
    try {
      const response = await authAPI.login({
        email: email,
        password: password,
      });

      const { token, data } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));
      setToken(token);
      setUser(data);

      return { success: true, data };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Login failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
