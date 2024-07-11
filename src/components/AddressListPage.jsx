import React, { useState, useEffect } from "react";
import { useAddress } from "../contexts/AddressContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons for action buttons
import AddressPage from "./AddressPage";
import Header from "./Header";
import PaymentOptions from "./PaymentOptions"; // Import PaymentOptions component
import { PaymentProvider } from "../contexts/PaymentContext";

function AddressListPage() {
  const { addresses, deleteAddress, updateAddress } = useAddress();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // Set default selected address if available
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  const handleRemove = async (addressId) => {
    try {
      await deleteAddress(addressId);
      toast.success("Address removed successfully!");
      if (addressId === selectedAddressId) {
        setSelectedAddressId(null); // Reset selected address if removed
      }
    } catch (error) {
      console.error("Error removing address:", error);
      toast.error("Failed to remove address.");
    }
  };

  const handleEdit = async (addressId, updatedData) => {
    try {
      await updateAddress(addressId, updatedData);
      toast.success("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address.");
    }
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleContinueToPayment = () => {
    setShowPaymentOptions(true); // Show PaymentOptions component on continue
  };

  if (showPaymentOptions) {
    return (
      <PaymentProvider>
        <PaymentOptions />
       
      </PaymentProvider>
    );
  }

  return (
    <>
      <Header
        className="bg-white shadow-none border-b-2"
        textColor="text-gray-800"
      />

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 lg:pr-8 mb-8 lg:mb-0">
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold text-gray-700">
              Select Delivery Address
            </p>
            <AddressPage />
          </div>

          <div className="mb-6">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-4 mb-4">
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressId === address.id}
                    onChange={() => handleAddressSelect(address.id)}
                    className="mr-2"
                  />
                  <span className="font-medium text-gray-700">
                    {address.name}
                  </span>
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {address.label.toUpperCase()}
                  </span>
                </label>
                <p className="text-sm mb-2">
                  {address.address}
                  <br />
                  {address.locality}, {address.city}, {address.state} -{" "}
                  {address.pinCode}
                </p>
                <p className="text-sm mb-2">Mobile: {address.mobile}</p>
                <p className="text-sm text-gray-500 mb-2">
                  • Pay on Delivery available
                </p>
                <div className="flex space-x-2">
                  <button
                    className="btn btn-sm btn-outline hover:btn-error rounded text-sm font-medium"
                    onClick={() => handleRemove(address.id)}
                  >
                    <FaTrash className="inline-block mr-1" /> REMOVE
                  </button>
                  <button
                    className="btn btn-sm btn-outline hover:btn-success rounded text-sm font-medium"
                    onClick={() =>
                      handleEdit(address.id, {
                        ...address,
                        name: "Updated Name",
                      })
                    }
                  >
                    <FaEdit className="inline-block mr-1" /> EDIT
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="btn btn-primary"
              onClick={handleContinueToPayment}
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressListPage;
