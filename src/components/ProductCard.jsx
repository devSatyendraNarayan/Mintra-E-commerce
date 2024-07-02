import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { WishlistContext } from "../contexts/WishlistContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.info(`Removed ${product.title} from wishlist`, {
        position: "top-center",
      });
    } else {
      addToWishlist(product);
      toast.success(`Added ${product.title} to wishlist`, {
        position: "top-center",
      });
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const handleOpenProductInNewTab = (product) => {
    const newWindow = window.open(`/product/${product.id}`, "_blank");
    if (newWindow) {
      newWindow.onload = () => {
        newWindow.document.title = product.title;
      };
    }
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg relative"
      onClick={() => handleOpenProductInNewTab(product)}
    >
      <Link
        to={`/product/${product.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain"
        />
      </Link>
      <button
        onClick={(event) => handleAddToWishlist(event, product)}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
      >
        {isInWishlist(product.id) ? (
          <FaHeart className="h-5 w-5 text-red-500" />
        ) : (
          <FaRegHeart className="h-5 w-5 text-gray-600" />
        )}
      </button>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-sm font-bold mt-2 inline-block badge badge-secondary badge-outline">
          {formatPriceInINR(product.price)}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
