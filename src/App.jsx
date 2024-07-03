import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Account from "./components/Account";
import MenPage from "./components/MenPage";
import WomenPage from "./components/WomenPage";
import CartItem from "./components/CartItem";
import Wishlist from "./components/Wishlist";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Sitemap from "./Pages/Sitemap";

import ProductDetail from "./Pages/ProductDetail";
import Header from "./components/Header";

const routeConfig = [
  { path: "/", element: <Home /> },
  { path: "/account", element: <Account /> },

  { path: "/product/:id", element: <ProductDetail /> },

  { path: "/men-category", element: <MenPage /> },
  { path: "/women-category", element: <WomenPage /> },
  { path: "/about-us", element: <About /> },
  { path: "/contact-us", element: <Contact /> },
  { path: "/site-map", element: <Sitemap /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/bag", element: <CartItem /> },
];

const App = () => {
  const routes = useMemo(
    () =>
      routeConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      )),
    []
  );

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>{routes}</Routes>
        </main>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
          className="z-[9999]"
        />

        <Footer />
      </div>
    </Router>
  );
};

export default App;
