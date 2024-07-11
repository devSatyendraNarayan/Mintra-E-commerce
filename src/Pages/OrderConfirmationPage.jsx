// src/contexts/OrderContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "./Firebase"; // Adjust the path as necessary
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchOrders(firebaseUser.uid);
      } else {
        setUser(null);
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async (uid) => {
    try {
      const ordersRef = collection(db, "users", uid, "orders");
      const ordersSnapshot = await getDocs(ordersRef);

      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch order data.");
    }
  };

  const placeOrder = async (orderDetails) => {
    if (!user) {
      toast.error("You need to be logged in to place an order.");
      return;
    }

    try {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const newOrderRef = await addDoc(ordersRef, orderDetails);

      // Remove ordered items from the cart
      orderDetails.items.forEach((item) => {
        removeFromCart(item.id);
      });

      // Update local orders state
      setOrders((prevOrders) => [
        ...prevOrders,
        { id: newOrderRef.id, ...orderDetails },
      ]);

      toast.success("Order placed successfully.");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
