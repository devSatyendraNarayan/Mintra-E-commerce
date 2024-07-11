import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import ProductProvider from "./contexts/ProductContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";
import ErrorBoundary from "./contexts/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { AddressProvider } from "./contexts/AddressContext";
import { OrderProvider } from "./contexts/OrderContext";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ErrorBoundary>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <AddressProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </AddressProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </ErrorBoundary>
    </AuthProvider>
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
    />
  </React.StrictMode>,
);
