import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ProductProvider from "./contexts/ProductContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";
import ErrorBoundary from "./contexts/ErrorBoundary"; // Import ErrorBoundary
import { AuthProvider } from "./contexts/AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <ErrorBoundary>
      <ProductProvider>
        <WishlistProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </WishlistProvider>
      </ProductProvider>
    </ErrorBoundary>
    </AuthProvider>
   
  </React.StrictMode>
);
