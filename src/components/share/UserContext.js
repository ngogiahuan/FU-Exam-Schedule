import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

// Create a new context
const UserContext = createContext();

// Create a custom provider for the UserContext
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // You can initialize it with the user object
  const [flag, setFlag] = useState(false);
  const URL = "https://swp3191.onrender.com";
  const login = (userData) => {
    // Implement your login logic here
    // Set the user object once the user is authenticated
    console.log("SET LOCAL STORAGE: ", userData);
    localStorage.setItem("mail", userData?.email);
    localStorage.setItem("role", userData?.Role);
    localStorage.setItem("picture", userData?.picture);
    localStorage.setItem(
      "username",
      userData?.name ? userData?.name : userData?.userName
    );
    localStorage.setItem("ID", userData?.ID);
    localStorage.setItem("isLogin", true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("mail");
    localStorage.removeItem("role");
    localStorage.removeItem("picture");
    localStorage.removeItem("username");
    localStorage.removeItem("ID");
    localStorage.removeItem("isLogin");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setFlag, flag, URL }}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook to access the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
