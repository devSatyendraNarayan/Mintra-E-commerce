import React from 'react';
import { Link } from 'react-router-dom';

function Sitemap() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><Link to="/men" className="text-blue-600 hover:underline">Men's Clothing</Link></li>
            <li><Link to="/women" className="text-blue-600 hover:underline">Women's Clothing</Link></li>
            <li><Link to="/accessories" className="text-blue-600 hover:underline">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">User Account</h2>
          <ul className="space-y-2">
            <li><Link to="/login" className="text-blue-600 hover:underline">Login</Link></li>
            <li><Link to="/register" className="text-blue-600 hover:underline">Register</Link></li>
            <li><Link to="/account" className="text-blue-600 hover:underline">My Account</Link></li>
            <li><Link to="/orders" className="text-blue-600 hover:underline">Order History</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Shopping</h2>
          <ul className="space-y-2">
            <li><Link to="/cart" className="text-blue-600 hover:underline">Shopping Cart</Link></li>
            <li><Link to="/wishlist" className="text-blue-600 hover:underline">Wishlist</Link></li>
            <li><Link to="/checkout" className="text-blue-600 hover:underline">Checkout</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Information</h2>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-blue-600 hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="text-blue-600 hover:underline">Contact Us</Link></li>
            <li><Link to="/faq" className="text-blue-600 hover:underline">FAQ</Link></li>
            <li><Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sitemap;