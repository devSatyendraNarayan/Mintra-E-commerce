import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import ErrorBoundary from "./contexts/ErrorBoundary"; // Adjust path as per your project structure
import AddressPage from "./components/AddressPage";
import ErrorPage from "./components/ErrorPage";
import AddressListPage from "./components/AddressListPage";
import OrderPlacedMessage from "./components/OrderPlacedMessage";
import OrderedProducts from "./Pages/OrderedProducts";

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
  { path: "/address", element: <AddressListPage /> },
  { path: "/error", element: <ErrorPage /> },
  { path: "/order-placed", element: <OrderPlacedMessage /> },
  { path: "/orderedProducts", element: <OrderedProducts /> },
 
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
          <ErrorBoundary>
            
            <Routes>{routes}</Routes>
          </ErrorBoundary>
        </main>

        

        <Footer />
      </div>
    </Router>
  );
};

export default App;
