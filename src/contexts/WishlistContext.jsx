import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../contexts/Firebase"; // Ensure this points to your Firebase setup
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchWishlist(user.uid);
      } else {
        setUser(null);
        setWishlist([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchWishlist = async (uid) => {
    try {
      const wishlistCollection = collection(db, "users", uid, "wishlist");
      const wishlistSnapshot = await getDocs(wishlistCollection);
      const wishlistData = wishlistSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishlist(wishlistData);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist.");
    }
  };

  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      const productRef = doc(db, "users", user.uid, "wishlist", product.id.toString());
      await setDoc(productRef, product);
      setWishlist((prevWishlist) => [...prevWishlist, product]);
      toast.success("Product added to wishlist.");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add product to wishlist.");
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      const productRef = doc(db, "users", user.uid, "wishlist", productId.toString());
      await deleteDoc(productRef);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== productId)
      );
      toast.info("Product removed from wishlist.");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove product from wishlist.");
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
