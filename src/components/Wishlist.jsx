import React, { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import Header from "./Header";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const formatPriceInINR = (priceInUSD) => {
    const exchangeRate = 83.39;
    const priceInINR = priceInUSD * exchangeRate;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(priceInINR);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const uniqueWishlist = wishlist.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
  );

  return (
    <>
      <Header
        className="bg-white"
        textColor="text-gray-800"
        showCategories={true}
      />
      <div className="container h-full mt-12 mx-auto px-4 py-8">
        <p className="text-2xl font-bold mb-8 text-gray-800">My Wishlist</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueWishlist.length > 0 ? (
            uniqueWishlist.map((product) => (
              <div
                key={product.id}
                className="relative bg-white rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-2xl"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain transition-opacity hover:opacity-90"
                  />
                </Link>
                <div className="p-4">
                  <div className="flex justify-end absolute top-0 right-0 pt-2 pr-2">
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="p-2 text-gray-600 hover:text-red-500"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm font-bold mt-2 mb-4 text-rose-500">
                    {formatPriceInINR(product.price)}
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-sm btn-primary flex items-center gap-2"
                    >
                      <FaShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col flex-grow items-center justify-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/256/12679/12679441.png"
                alt="Empty Wishlist"
                className="w-48 h-48 mb-4"
              />
              <p className="text-gray-800 uppercase font-semibold tracking-wide mb-2">
                Your wishlist is empty.
              </p>
              <p className="text-center mb-4">
                Add items that you like to your wishlist. Review them anytime
                and easily move them to the bag.
              </p>
              <Link
                to="/"
                className="btn bg-rose-600 text-white hover:bg-rose-700 hover:text-white btn-outline rounded-sm"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
