import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import { FaOpencart, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginModal from "./LoginModal";
import { AuthContext } from "../contexts/AuthContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { CartContext } from "../contexts/CartContext";

const Header = ({
  className = "",
  textColor = "text-white",
  showCategories = true,
  showUser = true,
  showWishlist = true,
  showCart = true,
  showMenu = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !dropdownRef.current?.contains(event.target) &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsDropdownOpen(false);
  };

  const renderLogo = () => (
    <Link to="/" className="top-2 left-4 sm:left-6">
      <img
        className="w-12 cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/128/3670/3670333.png"
        alt="Mintra-logo"
      />
    </Link>
  );

  const renderCategories = () =>
    showCategories && (
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            {["MEN", "WOMEN"].map((category) => (
              <Link
                key={category}
                to={`/${category.toLowerCase()}-category`}
                className={`font-semibold ${textColor} hover:scale-105 transition-all ease-out cursor-pointer`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );

  const renderIconWithBadge = (Icon, link, count) => (
    <Link to={link} className={`hover:text-[#eb2540] relative ${textColor}`}>
      <Icon />
      {count > 0 && (
        <span className="absolute -top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );

  const renderUserDropdown = () => (
    <div className={`relative ${textColor}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
      >
        <FaUser className={`hover:text-[#eb2540] ${textColor}`} />
      </button>
      {isDropdownOpen && (
        <div className="origin-top-right p-2 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="flex flex-col justify-start px-4 py-2 text-sm text-gray-700">
              <p className="font-semibold">
                Hello <span>Name</span>
              </p>
              <span>123456789</span>
            </div>
            <div className=" w-full h-[1px] bg-gray-200 my-1"></div>

            <div>
              <a
                href="#"
                className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Orders
              </a>
              <a
                className="block w-full py-1 text-left px-4 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Wishlist
              </a>
              <a
                href="#"
                className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Gift Cards
              </a>
              <a
                href="#"
                className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Contact us
              </a>
            </div>
            <div className=" w-full h-[1px] bg-gray-200 my-1"></div>
            <div>
              <a
                href="#"
                className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Coupons
              </a>
              <a
                className="block w-full py-1 text-left px-4 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Saved Addresses
              </a>
            </div>
            <div className=" w-full h-[1px] bg-gray-200 my-1"></div>

            <div>
              <a
                href="#"
                className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Edit Profile
              </a>
              <a
                onClick={handleLogout}
                className="block w-full text-left py-1 px-4 text-sm text-gray-700 hover:bg-rose-100"
                role="menuitem"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMobileMenu = () =>
    showMenu && (
      <div ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="sm:hidden items-center flex text-white hover:text-rose-400 focus:outline-none focus:text-gray-400"
        >
          <GiHamburgerMenu className={`hover:text-[#eb2540] ${textColor}`} />
        </button>
        {isMenuOpen && showCategories && (
          <div className="absolute right-0 mt-5 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {["MEN", "WOMEN"].map((category) => (
                <Link
                  key={category}
                  to={`/${category.toLowerCase()}-category`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );

  return (
    <nav
      className={`${className} px-5 fixed w-full z-50 top-0 left-0 shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          {renderLogo()}
          {renderCategories()}
          <div className="flex items-center  right-0 absolute">
            <div className="flex space-x-5 items-center">
              {showWishlist &&
                renderIconWithBadge(GrFavorite, "/wishlist", wishlist.length)}
              {showCart && renderIconWithBadge(FaOpencart, "/bag", cart.length)}
              {showUser && !user && <LoginModal />}
              {showUser && user && renderUserDropdown()}
              {renderMobileMenu()}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
