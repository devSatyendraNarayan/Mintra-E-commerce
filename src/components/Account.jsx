import React, { useState } from "react";
import Header from "./Header";
import Announcement from "./Announcement";
import { HiOutlineCheckCircle } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SidebarLink from "./SidebarLink";

function Account() {
  const announcementMessage = "Payday Party Ends In";
  const countdownDeadline = new Date("2024-07-04T00:00:00");
  const messageWhenExpired = "The party has ended. Thank you for joining us!";
  const [selectedDate, setSelectedDate] = useState(null);

  const SidebarSection = ({ title, links }) => (
    <div className="space-y-2">
      <p className="text-xs text-gray-400">{title}</p>
      {links.map((link, index) => (
        <SidebarLink key={index} to={link.to}>
          {link.label}
        </SidebarLink>
      ))}
      <div className="w-full h-px bg-gray-300 mb-5"></div>
    </div>
  );

  return (
    <>
      <Header
        className="bg-white shadow-none border-b-2"
        textColor="text-gray-800"
        showCategories={false}
        showMenu={false}
      />
      <Announcement
        message={announcementMessage}
        deadline={countdownDeadline}
        messageWhenExpired={messageWhenExpired}
      />
      <div className="container mx-auto px-5 mt-10 max-w-screen-md">
        <div className="text-gray-800 mb-3">
          <p className="font-semibold text-lg">Account</p>
          <p className="text-sm text-gray-500">Username: JohnDoe123</p>
        </div>
        <div className="w-full h-px bg-gray-300 mb-5"></div>

        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Sidebar (Hidden on smaller screens) */}
          <div className="hidden lg:block lg:w-1/4 lg:text-sm text-gray-500 mt-5 h-2 space-y-5 rounded-lg mb-5 lg:mb-0">
            <SidebarLink to="/overview">Overview</SidebarLink>
            <div className="w-full h-px bg-gray-300 mb-5"></div>
            <SidebarSection
              title="ORDERS"
              links={[{ to: "/orders-returns", label: "Orders & Returns" }]}
            />
            <SidebarSection
              title="CREDITS"
              links={[
                { to: "/coupons", label: "Coupons" },
                { to: "/mintra-credit", label: "Mintra Credit" },
                { to: "/mincash", label: "MinCash" },
              ]}
            />
            <SidebarSection
              title="ACCOUNT"
              links={[
                { to: "/profile", label: "Profile" },
                { to: "/saved-cards", label: "Saved Cards" },
                { to: "/saved-upi", label: "Saved UPI" },
                { to: "/addresses", label: "Addresses" },
                { to: "/delete-account", label: "Delete Account" },
              ]}
            />
            <SidebarSection
              title="LEGAL"
              links={[
                { to: "/terms-of-use", label: "Terms of Use" },
                { to: "/privacy-policy", label: "Privacy Policy" },
              ]}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 lg:ml-5 mb-5 px-5">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl mb-5 font-semibold text-gray-800">
                Edit Details
              </h2>
              <div className="w-full h-px bg-gray-300 mb-5"></div>

              {/* Email */}
              <div className="flex items-center border border-gray-300 p-2 justify-between mb-5">
                <div className="w-full lg:w-1/2 lg:pr-5">
                  <label
                    htmlFor="email"
                    className="text-sm text-gray-600 mb-1 block"
                  >
                    Email Address
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      id="email"
                      className="bg-white"
                      placeholder="john.doe@example.com"
                      readOnly
                    />
                    <HiOutlineCheckCircle className="text-green-500 text-xl" />
                  </div>
                </div>

                <button className="btn bg-white hover:bg-white text-gray-800 px-4 py-2 rounded mt-4 lg:mt-0">
                  Change
                </button>
              </div>

              {/* Additional fields */}
              <div className="space-y-4">
                {/* Full Name */}
                <label className="form-control">
                  <span className="label-text font-semibold text-gray-800 block">
                    Full Name
                  </span>
                  <input
                    type="text"
                    placeholder="Satyendra"
                    className="input input-bordered  rounded-sm bg-white text-gray-800 w-full"
                    readOnly
                  />
                </label>

                {/* Email */}
                <label className="form-control">
                  <span className="label-text font-semibold text-gray-800 block">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="Satyendra@gmail.com"
                    className="input input-bordered placeholder:text-gray-800 rounded-sm bg-white text-gray-800 w-full"
                    readOnly
                  />
                </label>

                {/* Gender Selection */}
                <div className="flex flex-row text-black items-center w-full gap-1">
                  <button className="btn text-gray-800 border border-gray-400 rounded-sm bg-white flex-grow hover:bg-white">
                    Male
                  </button>
                  <button className="btn text-gray-800 border border-gray-400 rounded-sm bg-white flex-grow hover:bg-white">
                    Female
                  </button>
                </div>

                {/* Date Picker */}
                <label className="form-control">
                  <span className="label-text font-semibold text-gray-800 block">
                    Birthday
                  </span>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="input input-bordered placeholder:text-gray-800 rounded-sm bg-white text-gray-800 w-full"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select Date"
                  />
                </label>

                {/* Alternate Mobile Details */}
                <label className="form-control">
                  <span className="label-text font-semibold text-gray-800 block">
                    Mobile Number
                  </span>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                      +91
                    </span>
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      className="input input-bordered placeholder:text-gray-800 rounded-sm bg-white text-gray-800 pl-10 w-full"
                    />
                  </div>
                </label>
                {/* Save Address */}
                <label className="form-control">
                  <span className="label-text font-semibold text-gray-800 block">
                    Address
                  </span>
                  <div className="">
                    <input
                      type="text"
                      placeholder="Full address*"
                      className="input input-bordered placeholder:text-gray-800 rounded-sm bg-white text-gray-800  w-full"
                    />
                  </div>
                </label>

                {/* Save Details Button */}
                <button className="btn my-5 rounded-sm bg-rose-500 hover:bg-rose-600 text-white border-none w-full py-3">
                  SAVE DETAILS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
