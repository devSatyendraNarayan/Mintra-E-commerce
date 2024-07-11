import React, { useState, useEffect, createContext } from "react";
import { auth, db } from "../contexts/Firebase"; // Import Firebase auth and firestore instance
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create AuthContext
export const AuthContext = createContext();

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the current user
  const [userData, setUserData] = useState(null); // State to hold the user data from Firestore

  useEffect(() => {
    // Firebase auth state change listener
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser(firebaseUser);
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            toast.error("User data not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data.");
        }
      } else {
        // User is signed out
        setUser(null);
        setUserData(null);
      }
    });

    // Clean-up function for unsubscribe
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
