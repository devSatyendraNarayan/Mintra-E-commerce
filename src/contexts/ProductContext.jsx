import React, { createContext, useState, useEffect, useMemo } from "react";

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = useMemo(() => ({ products, isLoading }), [products, isLoading]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;