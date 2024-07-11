import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { WishlistContext } from "../contexts/WishlistContext";

function ProductCard({ product }) {
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  const formatPriceInINR = (priceInUSD) => {
    const exchangeRate = 83.39;
    const priceInINR = priceInUSD * exchangeRate;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(priceInINR);
  };

  const handleAddToWishlist = (event, product) => {
    event.stopPropagation(); // Stop event propagation to prevent card click
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain transition-opacity hover:opacity-90"
        />
      </Link>
      <button
        onClick={(event) => handleAddToWishlist(event, product)}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md transition-transform hover:rotate-12 hover:bg-rose-100"
      >
        {isInWishlist(product.id) ? (
          <FaHeart className="h-5 w-5 text-red-500" />
        ) : (
          <FaRegHeart className="h-5 w-5 text-gray-600" />
        )}
      </button>
      <div className="p-4 transition-transform hover:translate-y-1">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-sm font-bold mt-2 text-rose-500">
          {formatPriceInINR(product.price)}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
