import React from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
function OrderPlacedMessage({ orderDetails }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto mt-10 flex justify-center">
      <div className="flex flex-col items-center">
        <TiTick className="text-gray-50 bg-green-500 text-5xl p-1 rounded-full" />
        <h2 className="text-xl font-bold text-gray-800 mt-4">
          Order Placed Successfully!
        </h2>
        {orderDetails && (
          <>
            <p className="text-gray-600 mt-2">
              Your order number is {orderDetails.orderNumber}.
            </p>
            <p className="text-gray-600">
              Estimated delivery date: {orderDetails.deliveryDate}
            </p>
          </>
        )}
        <p className="text-gray-600 mt-2">Thank you for shopping with us!</p>
        <Link to='/'>
        <button className="btn mt-5 bg-white border-none hover:bg-rose-500 hover:text-white">Continue Shopping</button>
        </Link>
      
      </div>
    </div>
  );
}

export default OrderPlacedMessage;
