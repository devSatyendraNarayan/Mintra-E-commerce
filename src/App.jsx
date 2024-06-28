import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaHome, FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";

import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Account from "./components/Account";
import Product from "./components/Product";
import CartItem from "./components/CartItem";
import MenPage from "./components/MenPage";
import WomenPage from "./components/WomenPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Sitemap from "./Pages/Sitemap";

const NavigationLink = ({ to, icon: Icon, activeLink, setActiveLink }) => (
  <li
    className={`${
      activeLink === to ? "active shadow-inner shadow-slate-50" : ""
    } hover:bg-[#eb2540] btn btn-ghost btn-circle transition duration-300 ease-in-out`}
  >
    <Link
      to={to}
      onClick={() => setActiveLink(to)}
      className="tooltip"
      data-tip={to}
    >
      <Icon className="text-xl text-white" />
    </Link>
  </li>
);

const App = () => {
  const [activeLink, setActiveLink] = useState("");

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <nav className="fixed bottom-5 left-0 right-0 z-50 flex justify-center">
          <ul className="flex flex-row justify-between items-center px-5 py-1 gap-2 bg-[#eb2540] backdrop-filter backdrop-blur-md bg-opacity-50 rounded-full">
            <NavigationLink
              to="/home"
              icon={FaHome}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
            <NavigationLink
              to="/wishlist"
              icon={FaHeart}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
            <NavigationLink
              to="/bag"
              icon={FaShoppingBag}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
            <NavigationLink
              to="/user"
              icon={FaUser}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          </ul>
        </nav>
        <main className="flex-grow">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/wishlist" element={<Product />} />
            <Route path="/bag" element={<CartItem />} />
            <Route path="/user" element={<Account />} />
            <Route path="/men+category" element={<MenPage />} />
            <Route path="/women+category" element={<WomenPage />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="//site-map" element={<Sitemap />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;