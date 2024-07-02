import React, { useState, useEffect, createContext } from "react";
import { auth } from "../contexts/Firebase"; // Import Firebase auth instance

// Create AuthContext
export const AuthContext = createContext();

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the current user
  
  useEffect(() => {
    // Firebase auth state change listener
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser(firebaseUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean-up function for unsubscribe
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
