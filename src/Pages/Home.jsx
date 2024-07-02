import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Hero from "../components/Hero";

function Home() {
  const { products } = useContext(ProductContext);

  // Get only men's & women's clothing category
  const menProducts = products.filter(
    (product) => product.category === "men's clothing"
  );
  const womenProducts = products.filter(
    (product) => product.category === "women's clothing"
  );

  return (
    <>
      <Hero />
    </>
  );
}

export default Home;
