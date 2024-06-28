import React, { useContext, useMemo } from "react";
import { ProductContext } from "../contexts/ProductContext";

function MenPage() {
  const { products } = useContext(ProductContext);

  const formatPriceInINR = (priceInUSD) => {
    const exchangeRate = 83.39;
    const priceInINR = priceInUSD * exchangeRate;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(priceInINR);
  };

  const clothingProducts = useMemo(
    () => products.filter((product) => product.category === "men's clothing"),
    [products]
  );

 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-[#eb2540]">Men's Clothing</h1>
      <p>Total products: {products.length}</p>
      <p>Men's clothing products: {clothingProducts.length}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clothingProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg cursor-pointer overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold truncate">
                {product.title}
              </h3>
              <p className="text-xs text-gray-600">{product.category}</p>
              <p className="text-sm font-bold mt-2 inline-block badge badge-secondary badge-outline">
                {formatPriceInINR(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenPage;