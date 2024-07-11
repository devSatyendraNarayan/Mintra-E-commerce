// OrderContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../contexts/Firebase'; // Adjust the path as necessary
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const placeOrder = async (orderDetails) => {
    try {
      if (!user) {
        toast.error('User not authenticated.');
        return;
      }

      const { items, total, discount, shippingFee } = orderDetails;

      // Validate all required fields
      if (!items || !total || !discount || !shippingFee) {
        toast.error('Invalid order details. Please check all fields.');
        return;
      }

      // Example path structure: users/{userId}/orders/{orderId}
      const orderRef = doc(db, 'users', user.uid, 'orders', `${new Date().getTime()}`); // Unique document ID
      await setDoc(orderRef, {
        items,
        total,
        discount,
        shippingFee,
        createdAt: serverTimestamp()
      });

      toast.success('Order placed successfully.');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again later.');
    }
  };

  return (
    <OrderContext.Provider value={{ placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
