import React, { useContext, useMemo } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";

function Hero() {
  const { products } = useContext(ProductContext);
console.log(products)
  // Function to convert USD to INR and format
  const formatPriceInINR = (priceInUSD) => {
    const exchangeRate = 83.39; // Assuming 1 USD = 75 INR (you should use an up-to-date rate)
    const priceInINR = priceInUSD * exchangeRate;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0, // Remove decimal places
    }).format(priceInINR);
  };

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
    slidesToShow: 5,
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

      <Header />

      <div className="z-10 w-full absolute bottom-0 left-0 right-0 pb-8 px-10">
        <Slider {...settings}>
          {clothingProducts.map((product) => (
            <div key={product.id} className="px-2">
              <div className="bg-white rounded-lg cursor-pointer overflow-hidden shadow-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-950 tracking-wide truncate">
                    {product.title}
                  </p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-sm  font-bold mt-2 badge badge-secondary badge-outline">
                    {formatPriceInINR(product.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Hero;
