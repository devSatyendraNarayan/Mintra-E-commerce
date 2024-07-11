import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "./Firebase";
import { doc, collection, addDoc, updateDoc, deleteDoc, query, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchAddresses(user.uid);
      } else {
        setAddresses([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAddresses = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const addressCollectionRef = collection(userRef, "addresses");
      const q = query(addressCollectionRef);
      const addressSnapshot = await getDocs(q);

      const fetchedAddresses = addressSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAddresses(fetchedAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to fetch addresses.");
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (newAddress) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      const userRef = doc(db, "users", user.uid);
      const addressCollectionRef = collection(userRef, "addresses");
      const docRef = await addDoc(addressCollectionRef, newAddress);
      
      setAddresses((prevAddresses) => [
        ...prevAddresses,
        { id: docRef.id, ...newAddress },
      ]);

      toast.success("Address added successfully!");
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address.");
    }
  };

  const updateAddress = async (id, updatedAddress) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      const userRef = doc(db, "users", user.uid);
      const addressRef = doc(userRef, "addresses", id);
      await updateDoc(addressRef, updatedAddress);

      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address.id === id ? { ...address, ...updatedAddress } : address
        )
      );

      toast.success("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address.");
    }
  };

  const deleteAddress = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      const userRef = doc(db, "users", user.uid);
      const addressRef = doc(userRef, "addresses", id);
      await deleteDoc(addressRef);

      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== id)
      );

      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address.");
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  return useContext(AddressContext);
};
