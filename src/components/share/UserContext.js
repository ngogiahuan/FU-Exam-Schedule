import React, { createContext, useContext, useState } from "react";

// Create a new context
const UserContext = createContext();

// Create a custom provider for the UserContext
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // You can initialize it with the user object
  const [flag, setFlag] = useState(false);

  const login = (userData) => {
    // Implement your login logic here
    // Set the user object once the user is authenticated
    console.log(userData);
    localStorage.setItem("mail", userData[0]?.email);
    localStorage.setItem("role", userData[0]?.Role);
    localStorage.setItem("username", userData[0]?.userName);
    localStorage.setItem("isLogin", true);

    setUser(userData);
  };

  const logout = () => {
    // Implement your logout logic here
    // Clear the user object when the user logs out
    localStorage.removeItem("mail");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("isLogin");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setFlag, flag }}>
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
