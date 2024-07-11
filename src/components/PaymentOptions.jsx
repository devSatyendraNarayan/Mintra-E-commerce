// PaymentOptions.js (updated)
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaStar,
  FaWallet,
  FaCreditCard,
  FaRegCreditCard,
  FaClock,
  FaUniversity,
  FaGift,
} from "react-icons/fa";
import { RiHandCoinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { usePayment } from "../contexts/PaymentContext"; // Adjust the path as necessary

const PaymentOptions = () => {
  const { selectedPayment, handlePaymentSelect, handlePlaceOrder } = usePayment();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl text-gray-700 font-bold mb-4">Choose Payment Mode</h2>

      {/* Payment Options List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side */}
        <div className="bg-gray-100 rounded-lg shadow-md p-4">
          <ul className="space-y-4">
            <li
              className={`flex items-center cursor-pointer ${
                selectedPayment === "COD" ? "text-rose-500" : ""
              }`}
              onClick={() => handlePaymentSelect("COD")}
            >
              <RiHandCoinLine className="text-purple-600 text-xl mr-2" />
              <span>Cash On Delivery (Cash/UPI)</span>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                selectedPayment === "UPI" ? "text-rose-500" : ""
              }`}
              onClick={() => handlePaymentSelect("UPI")}
            >
              <FaWallet className="text-green-500 text-xl mr-2" />
              <span>UPI (Pay via any App)</span>
              <span className="ml-2 text-xs text-green-500">1 Offer</span>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                selectedPayment === "Card" ? "text-rose-500" : ""
              }`}
              onClick={() => handlePaymentSelect("Card")}
            >
              <FaCreditCard className="text-blue-500 text-xl mr-2" />
              <span>Credit/Debit Card</span>
              <span className="ml-2 text-xs text-green-500">4 Offers</span>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                selectedPayment === "Wallet" ? "text-rose-500" : ""
              }`}
              onClick={() => handlePaymentSelect("Wallet")}
            >
              <FaRegCreditCard className="text-blue-500 text-xl mr-2" />
              <span>Wallets</span>
              <span className="ml-2 text-xs text-green-500">4 Offers</span>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                selectedPayment === "PayLater" ? "text-rose-500" : ""
              }`}
              onClick={() => handlePaymentSelect("PayLater")}
            >
              <FaClock className="text-yellow-500 text-xl mr-2" />
              <span>Pay Later</span>
              <span className="ml-2 text-xs text-green-500">1 Offer</span>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                selectedPayment === "EMI" ? "text-rose-500" : ""
              }`}
              onClick={() => handlePaymentSelect("EMI")}
            >
              <FaCreditCard className="text-blue-500 text-xl mr-2" />
              <span>EMI</span>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                selectedPayment === "NetBanking" ? "text-rose-500" : ""
              }`}
              onClick={() => handlePaymentSelect("NetBanking")}
            >
              <FaUniversity className="text-indigo-500 text-xl mr-2" />
              <span>Net Banking</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="flex justify-end mt-8">
        <Link to='/order-placed'>
        <button
          className={`btn btn-primary ${
            selectedPayment ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={handlePlaceOrder}
          disabled={!selectedPayment}
        >
          PLACE ORDER
        </button>
        </Link>
       
      </div>

      {/* Gift Card Section */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <FaGift className="text-red-500 text-xl mr-2" />
            <span>Have a Gift Card?</span>
          </div>
          <button className="text-rose-500 hover:text-rose-600">
            APPLY GIFT CARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
