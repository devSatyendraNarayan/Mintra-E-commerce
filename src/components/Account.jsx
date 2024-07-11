import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Announcement from "./Announcement";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDeleteOutline, MdAdd } from "react-icons/md";
import { auth, db } from "../contexts/Firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import { AuthContext } from "../contexts/AuthContext";
import AddressEditModal from "./AddressEditModal";
import AddressPage from "./AddressPage";

function Account() {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    mobile: "",
    birthday: null,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        setLoading(false);
        toast.error("User not authenticated.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(doc(db, "users", user.uid), "addresses"),
        (snapshot) => {
          const fetchedAddresses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAddresses(fetchedAddresses);
        },
        (error) => {
          console.error("Error fetching addresses:", error);
          toast.error("Failed to fetch addresses.");
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userDataFromDb = userDoc.data();
        setUserData({
          name: userDataFromDb.name,
          email: userDataFromDb.email,
          gender: userDataFromDb.gender || "",
          mobile: userDataFromDb.mobile || "",
          birthday: userDataFromDb.birthday || null,
        });
        setSelectedDate(
          userDataFromDb.birthday ? new Date(userDataFromDb.birthday) : null
        );
      } else {
        toast.error("User data not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserDetailsSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          name: userData.name,
          gender: userData.gender,
          mobile: userData.mobile,
          birthday: selectedDate ? selectedDate.toISOString() : null,
        });

        toast.success("Details updated successfully!");
      } catch (error) {
        console.error("Error updating user details:", error);
        toast.error("Failed to update details.");
      }
    } else {
      toast.error("User not authenticated.");
    }
  };

  const handleAddressUpdate = async (id, updatedAddress) => {
    try {
      const addressRef = doc(db, "users", user.uid, "addresses", id);
      await updateDoc(addressRef, updatedAddress);
      toast.success("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddressChange = (id, updatedAddress) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id ? { ...address, ...updatedAddress } : address
      )
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRemoveAddress = async (id) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const addressRef = doc(userRef, "addresses", id);
      await deleteDoc(addressRef);

      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== id)
      );

      toast.success("Address removed successfully!");
    } catch (error) {
      console.error("Error removing address:", error);
      toast.error("Failed to remove address.");
    }
  };

  const handleAddAddress = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddAddressSubmit = async (newAddress) => {
    try {
      if (!user || !user.uid) {
        throw new Error("User not authenticated");
      }

      // Check if all required fields are present in newAddress
      const requiredFields = [
        "address",
        "locality",
        "city",
        "state",
        "pinCode",
      ];
      for (const field of requiredFields) {
        if (!newAddress[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      const userRef = doc(db, "users", user.uid);
      const docRef = await addDoc(collection(userRef, "addresses"), newAddress);

      console.log("Address added with ID: ", docRef.id);
      toast.success("Address added successfully!");
      setShowAddModal(false); // Close modal after successful addition
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error(`Failed to add address: ${error.message}`);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        className="bg-white shadow-none border-b-2"
        textColor="text-gray-800"
        showCategories={false}
        showMenu={false}
      />
      <Announcement
        message="Payday Party Ends In"
        deadline={new Date("2024-07-20T00:00:00")}
        messageWhenExpired="The party has ended. Thank you for joining us!"
      />
      <div className="container mx-auto px-5 mt-10 max-w-screen-md">
        <div className="text-gray-800 mb-3">
          <p className="font-semibold text-lg">Account</p>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
        <div className="w-full h-px bg-gray-300 mb-5"></div>

        <div className="flex flex-col lg:flex-row lg:justify-between">
          <Sidebar />

          <div className="lg:w-3/4 lg:ml-5 mb-5 px-5">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl mb-5 font-semibold text-gray-800">
                Edit Details
              </h2>
              <div className="w-full h-px bg-gray-300 mb-5"></div>

              <form onSubmit={handleUserDetailsSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label-text font-semibold text-gray-800 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="input input-bordered rounded-sm bg-white text-gray-800 w-full"
                    value={userData.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Gender Selection */}
                <div className="form-control">
                  <label className="label-text font-semibold text-gray-800 block">
                    Gender
                  </label>
                  <div className="flex flex-row text-black items-center w-full gap-1">
                    <button
                      type="button"
                      className={`btn text-gray-800 border border-gray-400 rounded-sm focus:border-rose-500 bg-white flex-grow hover:bg-white ${
                        userData.gender === "Male" ? "text-rose-500" : ""
                      }`}
                      onClick={() =>
                        setUserData({ ...userData, gender: "Male" })
                      }
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      className={`btn text-gray-800 border border-gray-400 focus:border-rose-500 rounded-sm bg-white flex-grow hover:bg-white ${
                        userData.gender === "Female" ? "text-rose-500" : ""
                      }`}
                      onClick={() =>
                        setUserData({ ...userData, gender: "Female" })
                      }
                    >
                      Female
                    </button>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="form-control">
                  <label className="label-text font-semibold text-gray-800 block">
                    Birthday
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="input input-bordered rounded-sm bg-white text-gray-800 w-full"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select Date"
                  />
                </div>

                {/* Mobile Number */}
                <div className="form-control">
                  <label className="label-text font-semibold text-gray-800 block">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter 10-digit mobile number"
                      className="input input-bordered rounded-sm bg-white text-gray-800 w-full pl-12 pr-3 py-2"
                      value={userData.mobile}
                      onChange={handleInputChange}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>

                {/* Save Details Button */}
                <div className="flex justify-end mb-5">
                  <button
                    type="submit"
                    className="btn rounded-sm bg-rose-500 hover:bg-rose-600 text-white border-none py-3"
                  >
                    SAVE DETAILS
                  </button>
                </div>
              </form>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mt-5">
              <h2 className="text-2xl mb-5 font-semibold text-gray-800">
                Addresses
              </h2>
              <div className="w-full h-px bg-gray-300 mb-5"></div>

              {addresses.length === 0 ? (
                <div className="flex items-center justify-center h-48">
                  <button onClick={handleAddAddress}>
                    <AddressPage
                      show={showAddModal}
                      handleClose={handleCloseAddModal}
                      userId={user.uid}
                      addAddress={handleAddAddressSubmit}
                    />
                  </button>
                </div>
              ) : (
                <>
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="bg-gray-200 w-full h-fit text-gray-800 rounded-md p-2 flex items-center justify-between mb-2"
                    >
                      <div>
                        <p>
                          {address.address}, {address.locality}, {address.city},{" "}
                          {address.state}, {address.pinCode}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AddressEditModal
                          address={address}
                          handleAddressChange={handleAddressChange}
                        />
                        <button
                          onClick={() => handleRemoveAddress(address.id)}
                          className="btn btn-ghost text-lg text-red-500 hover:text-red-700"
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <button onClick={handleAddAddress}>
                      <AddressPage
                        show={showAddModal}
                        handleClose={handleCloseAddModal}
                        userId={user.uid}
                        addAddress={handleAddAddressSubmit}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
