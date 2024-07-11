import React from "react";
import { formatPrice } from "../utils/Helpers";

const PriceDetails = ({ cart, Finaltotal, discount, shippingFee, total, className }) => {
  return (
    <div className={`w-[80vw] bg-white border border-gray-300 p-3 mx-5 my-5 ${className}`}>
      <p className="text-lg tracking-wide font-semibold text-gray-800">
        PRICE DETAILS ({cart.length} item{cart.length !== 1 ? "s" : ""})
      </p>
      <div className="flex justify-between py-2">
        <p className="text-gray-800">Total MRP</p>
        <p className="text-gray-800">{formatPrice(Finaltotal)}</p>
      </div>
      <div className="flex justify-between py-2">
        <p className="text-gray-800">Discount on MRP</p>
        <p className="text-gray-800">{formatPrice(discount)}</p>
      </div>
      <div className="flex justify-between py-2">
        <p className="text-gray-800">Coupon Discount</p>
        <button className="text-blue-500">Apply Coupon</button>
      </div>
      <div className="flex justify-between py-2">
        <p className="text-gray-800">Platform Fee</p>
        <p className="text-gray-800">FREE</p>
      </div>
      <div className="flex justify-between py-2">
        <div className="flex items-center">
          <p className="text-gray-800">Shipping Fee</p>
          {total < 2000 && (
            <div
              className="badge badge-secondary badge-xs tooltip"
              data-tip="Free shipping for orders over ₹2000"
            ></div>
          )}
        </div>
        <p className="text-gray-800">{formatPrice(shippingFee)}</p>
      </div>
      <div className="w-full my-2 h-[1px] bg-gray-300"></div>
      <div className="flex justify-between py-2 font-semibold">
        <p className="text-gray-800">Total Amount</p>
        <p className="text-gray-800">{formatPrice(total)}</p>
      </div>
    </div>
  );
};

export default PriceDetails;
