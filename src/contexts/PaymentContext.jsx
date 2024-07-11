// PaymentContext.js
import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handlePlaceOrder = () => {
    if (selectedPayment) {
      toast.success(`Order placed successfully using ${selectedPayment}.`);
      // Additional logic for actual payment processing can be added here
    } else {
      toast.error("Select Payment Method.");
    }
  };

  return (
    <PaymentContext.Provider
      value={{ selectedPayment, handlePaymentSelect, handlePlaceOrder }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  return useContext(PaymentContext);
};
