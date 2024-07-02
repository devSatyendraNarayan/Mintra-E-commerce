import React, { useContext, useMemo } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { WishlistContext } from "../contexts/WishlistContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";
import ProductCard from "./ProductCard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Hero() {
  const { products } = useContext(ProductContext);

  const clothingProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.category === "men's clothing" ||
          product.category === "women's clothing"
      ),
    [products]
  );

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      className="hero min-h-screen relative"
      style={{
        backgroundImage:
          "url(https://dminteriors.lk/wp-content/uploads/2021/09/Cloth-Shop-Interior-Design-Ideas.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <Header className="bg-transparent" textColor="text-gray-200" showCategories={true} />
      <ToastContainer />
      <div className="z-10 w-full absolute bottom-0 left-0 right-0 pb-8 px-10">
        <Slider {...settings}>
          {clothingProducts.map((product) => (
            <div key={product.id} className="px-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Hero;
