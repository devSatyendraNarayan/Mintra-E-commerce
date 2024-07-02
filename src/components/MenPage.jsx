import React, { useContext, useMemo } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import ProductCard from "./ProductCard";

function MenPage() {
  const { products } = useContext(ProductContext);

  const clothingProducts = useMemo(
    () => products.filter((product) => product.category === "men's clothing"),
    [products]
  );

  return (
    <>
      <Header className="bg-white" textColor="text-gray-800" showCategories={false} showMenu={false}/>
      <ToastContainer />
      <div className="container mt-12 mx-auto h-full flex items-center justify-center flex-col px-4 py-8">
        <h1 className="text-5xl font-bold mb-2 text-[#eb2540]">
          Men's Clothing
        </h1>
        <p>Men's clothing products: {clothingProducts.length}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MenPage;
