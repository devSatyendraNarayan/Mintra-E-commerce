import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import { ProductContext } from "../contexts/ProductContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "./ProductCard";

function Suggestion() {
  const [activeTab, setActiveTab] = useState("all");
  const { id } = useParams(); // Access id from route params
  const { products } = useContext(ProductContext);
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeTab !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === `${activeTab}'s clothing`
      );
    }

    return filtered.filter(
      (product) => 
        product.id !== parseInt(id) &&  // Exclude the current product being viewed
        !wishlist.some((wishlistItem) => wishlistItem.id === product.id) &&
        !cart.some((cartItem) => cartItem.id === product.id)
    );
  }, [activeTab, products, wishlist, cart, id]);

  return (
    <div className="h-full mb-10 text-gray-800 bg-rose-50 w-full p-3">
      <div className="w-full h-[1px] bg-gray-800"></div>
      <p className="font-semibold tracking-wide my-3">You may also like:</p>
      <div role="tablist" className="tabs tabs-bordered">
        <button
          role="tab"
          className={`tab text-gray-800 ${activeTab === "all" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          role="tab"
          className={`tab text-gray-800 ${activeTab === "men" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("men")}
        >
          Men
        </button>
        <button
          role="tab"
          className={`tab text-gray-800 ${activeTab === "women" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("women")}
        >
          Women
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Suggestion;
