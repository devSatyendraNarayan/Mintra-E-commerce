import React, { useState } from "react";
import { useAddress } from "../contexts/AddressContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddressPage = () => {
  const { addAddress } = useAddress();

  const [addressData, setAddressData] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    label: "Home", // Default label
    isDefault: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleLabelChange = (label) => {
    setAddressData({ ...addressData, label });
  };

  const handleCheckboxChange = (e) => {
    setAddressData({ ...addressData, isDefault: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAddress(addressData);
      // Clear form fields after successful submission
      setAddressData({
        name: "",
        mobile: "",
        pinCode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
        label: "Home",
        isDefault: false,
      });
      
      // Close the modal after successful submission
      document.getElementById("my_modal_3").close();
      
      toast.success("Address added successfully!");
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address.");
    }
  };

  return (
    <>
      <button
        className="btn text-gray-700 btn-outline hover:bg-rose-500 hover:text-white hover:border-none"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        ADD NEW ADDRESS
      </button>
      <dialog id="my_modal_3" className="modal  bg-gray-500 bg-opacity-50">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="text-md text-gray-800 font-semibold mb-4">
            CONTACT DETAILS
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="input input-bordered w-full bg-white text-gray-800"
              type="text"
              name="name"
              placeholder="Name*"
              value={addressData.name}
              onChange={handleInputChange}
              required
            />
            <input
              className="input input-bordered w-full bg-white text-gray-800"
              type="tel"
              name="mobile"
              placeholder="Mobile No*"
              value={addressData.mobile}
              onChange={handleInputChange}
              required
            />
            <p className="text-sm text-gray-800 font-semibold mt-6 mb-4">
              ADDRESS
            </p>
            <input
              className="input input-bordered w-full bg-white text-gray-800"
              type="text"
              name="pinCode"
              placeholder="Pin Code*"
              value={addressData.pinCode}
              onChange={handleInputChange}
              required
            />
            <input
              className="input input-bordered w-full bg-white text-gray-800"
              type="text"
              name="address"
              placeholder="Address (House No, Building, Street, Area)*"
              value={addressData.address}
              onChange={handleInputChange}
              required
            />
            <input
              className="input input-bordered w-full bg-white text-gray-800"
              type="text"
              name="locality"
              placeholder="Locality / Town*"
              value={addressData.locality}
              onChange={handleInputChange}
              required
            />
            <div className="flex space-x-2 mb-4">
              <input
                className="w-1/2 input input-bordered max-w-xs bg-white text-gray-800"
                type="text"
                name="city"
                placeholder="City / District*"
                value={addressData.city}
                onChange={handleInputChange}
                required
              />
              <input
                className="w-1/2 input input-bordered max-w-xs bg-white text-gray-800"
                type="text"
                name="state"
                placeholder="State*"
                value={addressData.state}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <span className="text-sm">SAVE ADDRESS AS</span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className={`px-3 py-1 rounded-full border ${
                    addressData.label === "Home"
                      ? "border-rose-500 text-rose-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                  onClick={() => handleLabelChange("Home")}
                >
                  Home
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 rounded-full border ${
                    addressData.label === "Work"
                      ? "border-rose-500 text-rose-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                  onClick={() => handleLabelChange("Work")}
                >
                  Work
                </button>
              </div>
            </div>

            {/* <label className="flex items-center mb-4 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-accent"
                checked={addressData.isDefault}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-sm text-gray-800">
                Make this my default address
              </span>
            </label> */}

            <button
              type="submit"
              className="btn w-full border-none text-white bg-rose-500 rounded-sm hover:bg-rose-600"
            >
              ADD ADDRESS
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddressPage;
