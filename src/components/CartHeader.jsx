import React from 'react';
import Header from "./Header";
import Modal from "./Modal";

const CartHeader = () => (
  <>
   
   
      <div className="w-[80vw] h-fit tracking-wide text-gray-800 font-semibold flex flex-row items-center justify-between bg-rose-50 border border-gray-300 p-6 mx-5 my-5">
        <p>Check delivery time & services</p>
        <Modal />
      </div>
  </>
);

export default CartHeader;
