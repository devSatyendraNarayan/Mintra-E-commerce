import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { useAddress } from '../contexts/AddressContext'; // Import the AddressContext

function AddressEditModal({ address, handleAddressChange }) {
  const { updateAddress } = useAddress(); // Access updateAddress function from AddressContext
  const [isOpen, setIsOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState(address);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    handleAddressChange(address.id, editedAddress); // Update parent component state
    updateAddress(address.id, editedAddress); // Update address using context function
    closeModal(); // Close modal after saving
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedAddress({ ...editedAddress, [name]: value });
  };

  return (
    <>
      <button onClick={openModal} className='btn btn-ghost'>
        <CiEdit className='text-xl' />
      </button>
      {isOpen && (
        <dialog open className='modal'>
          <div className='modal-box bg-white'>
            <form onSubmit={handleSubmit}>
              <button onClick={closeModal} className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                ✕
              </button>
              {/* Address */}
              <div className='form-control'>
                <label className='label-text font-semibold text-gray-800 block'>Address</label>
                <input
                  type='text'
                  name='address'
                  placeholder='Address (House No, Building, Street, etc.)'
                  className='input input-bordered rounded-sm bg-white text-gray-800 w-full'
                  value={editedAddress.address}
                  onChange={handleInputChange}
                />
              </div>

              {/* Locality */}
              <div className='form-control'>
                <label className='label-text font-semibold text-gray-800 block'>Locality</label>
                <input
                  type='text'
                  name='locality'
                  placeholder='Locality'
                  className='input input-bordered rounded-sm bg-white text-gray-800 w-full'
                  value={editedAddress.locality}
                  onChange={handleInputChange}
                />
              </div>

              {/* City */}
              <div className='form-control'>
                <label className='label-text font-semibold text-gray-800 block'>City</label>
                <input
                  type='text'
                  name='city'
                  placeholder='City'
                  className='input input-bordered rounded-sm bg-white text-gray-800 w-full'
                  value={editedAddress.city}
                  onChange={handleInputChange}
                />
              </div>

              {/* State */}
              <div className='form-control'>
                <label className='label-text font-semibold text-gray-800 block'>State</label>
                <input
                  type='text'
                  name='state'
                  placeholder='State'
                  className='input input-bordered rounded-sm bg-white text-gray-800 w-full'
                  value={editedAddress.state}
                  onChange={handleInputChange}
                />
              </div>

              {/* Pin Code */}
              <div className='form-control'>
                <label className='label-text font-semibold text-gray-800 block'>Pin Code</label>
                <input
                  type='text'
                  name='pinCode'
                  placeholder='Pin Code'
                  className='input input-bordered rounded-sm bg-white text-gray-800 w-full'
                  value={editedAddress.pinCode}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit Button */}
              <div className='flex justify-end mb-5'>
                <button type='submit' className='btn rounded-sm bg-rose-500 hover:bg-rose-600 text-white border-none py-3'>
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}

export default AddressEditModal;
