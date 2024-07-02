import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import Header from "../components/Header";
import Suggestion from "../components/Suggestion";
import { RiStarSmileFill } from "react-icons/ri";
import { FaAngleRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";
import { GoStar } from "react-icons/go";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import { WishlistContext } from "../contexts/WishlistContext";

import "react-toastify/dist/ReactToastify.css";

const formatPriceInINR = (priceInUSD) => {
  const exchangeRate = 83.39;
  const priceInINR = priceInUSD * exchangeRate;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceInINR);
};

const Breadcrumbs = ({ category }) => (
  <div className="breadcrumbs text-sm text-gray-800 mt-20 px-10 mb-5">
    <ul>
      <li className="hover:text-rose-500">
        <Link to="/">Home</Link>
      </li>
      {category && (
        <>
          <li className="hover:text-rose-500">
            <p>{category}</p>
          </li>
          <li className="hover:text-rose-500">Add Document</li>
        </>
      )}
    </ul>
  </div>
);

const RatingSection = ({ rate, count }) => (
  <div className="flex items-center gap-2 border w-fit p-1 border-gray-300">
    <div className="flex items-center gap-2">
      <p className="text-gray-800 font-semibold">{rate}</p>
      <RiStarSmileFill className="text-xl text-green-500" />
    </div>
    <div className="w-[1px] h-4 bg-gray-300"></div>
    <div>
      <p className="text-gray-500">{count}k Ratings</p>
    </div>
  </div>
);

const DeliveryOptions = () => (
  <div>
    <div className="flex items-center gap-2 text-gray-800">
      <p className="font-semibold text-lg tracking-wide">DELIVERY OPTIONS</p>
      <CiDeliveryTruck className="text-2xl" />
    </div>
    <input
      type="number"
      className=" px-2  py-2 border my-2 text-gray-800 bg-transparent focus:border-transparent focus:outline-none focus:ring-0"
      placeholder="Enter PIN code"
    />
    <p className="text-gray-500 text-sm mb-5">
      Please enter PIN code to check delivery time & Pay on Delivery
      Availability
    </p>
    <div className="flex flex-col mb-5 text-gray-800 text-md mt-2">
      <p>100% Original Products</p>
      <p>Pay on delivery might be available</p>
      <p>Easy 14 days returns and exchanges</p>
    </div>
  </div>
);

const BestOffers = () => (
  <div className="mb-5">
    <div className="flex items-center gap-2 text-gray-800">
      <p className="font-bold text-lg tracking-wide">BEST OFFERS</p>
      <MdOutlineLocalOffer className="text-lg" />
    </div>
    <ul className="text-gray-800 my-2">
      <li>
        Coupon code: <span className="font-bold tracking-wide">MINTRA100</span>
      </li>
      <li>Coupon Discount: Rs. 95 off check cart for final savings</li>
    </ul>
  </div>
);

const ProductDetails = ({ description }) => (
  <div>
    <div className="flex items-center text-gray-800 gap-2 text-lg">
      <p className="font-bold">PRODUCT DETAILS</p>
      <CgDetailsMore />
    </div>
    <p className="text-gray-800 text-md mt-2">{description}</p>
  </div>
);

const Ratings = ({ rate, count }) => (
  <div className="">
    <div className="flex items-center gap-2 text-lg text-gray-800">
      <p className="font-bold">RATINGS</p>
      <GoStar />
    </div>
    <div className="flex items-center w-fit justify-between mt-2 ">
      <div>
        <div className="flex items-center gap-2 text-5xl text-gray-800">
          <p>{rate}</p>
          <RiStarSmileFill className="text-green-500" />
        </div>
        <p className="text-gray-500 text-sm">{count}k Verified Buyers</p>
      </div>
      <div className="w-[1px] h-24 bg-gray-300 mx-4"></div>
      <div className="flex flex-col space-y-2">
        <progress
          className="progress progress-success w-56"
          value={0}
          max="100"
        ></progress>
        <progress
          className="progress progress-success w-56"
          value="10"
          max="100"
        ></progress>
        <progress
          className="progress progress-success w-56"
          value="40"
          max="100"
        ></progress>
        <progress
          className="progress progress-success w-56"
          value="70"
          max="100"
        ></progress>
        <progress
          className="progress progress-success w-56"
          value="100"
          max="100"
        ></progress>
      </div>
    </div>
  </div>
);

const CustomerFeedback = ({ count }) => (
  <div className="mt-5">
    <div className="flex items-center gap-2 text-lg text-gray-800 tracking-wide font-bold">
      <p>WHAT CUSTOMERS SAID</p>
      <GoStar />
    </div>
    <div className="text-gray-800 mt-2">
      <div>
        <p>Fit</p>
        <div className="flex items-center gap-3">
          <progress
            className="progress progress-success w-56"
            value="71"
            max="100"
          ></progress>
          <p className="font-bold">Just Right (71%)</p>
        </div>
      </div>
      <div>
        <p>Length</p>
        <div className="flex items-center gap-3 mt-2">
          <progress
            className="progress progress-success w-56"
            value="79"
            max="100"
          ></progress>
          <p className="font-bold">Just Right (79%)</p>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.find((product) => product.id === parseInt(id));
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);
  if (!product) {
    return <Loading />;
  }

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

  return (
    <>
      <Header
        className="bg-white"
        textColor="text-gray-800"
        showCategories={true}
      />
      <ToastContainer />
      <Breadcrumbs />
      <div className="h-full flex flex-col items-center mx-auto container w-full px-5 lg:px-10 gap-5">
        <div className="flex flex-col lg:flex-row justify-around w-full gap-5">
          <div className="w-full lg:w-1/3">
            <img src={product.image} alt={product.title} className="w-full" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col space-y-2">
            <p className="text-gray-900 font-semibold tracking-wide">
              {product.title}
            </p>
            <p className="text-gray-500 font-thin tracking-wide">
              {product.category}
            </p>
            <RatingSection
              rate={product.rating.rate}
              count={product.rating.count}
            />
            <div className="w-full h-[1px] bg-gray-500 mt-2"></div>
            <div className="flex flex-col items-start">
              <p className="text-2xl font-bold text-gray-900">
                {formatPriceInINR(product.price)}
              </p>
              <p className="text-md font-bold tracking-wide text-green-500">
                inclusive of all taxes
              </p>
            </div>
            <div className="flex flex-col space-y-3 w-fit">
              <div className="flex flex-row items-center justify-between">
                <p className="font-semibold tracking-wide text-gray-900">
                  SELECT SIZE
                </p>
                <div className="flex cursor-pointer items-center text-rose-500">
                  <p className="font-semibold">SIZE CHART</p>
                  <FaAngleRight />
                </div>
              </div>
              <div
                className="flex flex-row gap-2 pb-5

 text-gray-800 items-center"
              >
                {["39", "40", "41", "42"].map((size) => (
                  <p
                    key={size}
                    className="btn text-gray-800 btn-circle btn-outline hover:border-red-500 hover:bg-transparent transition-all"
                  >
                    {size}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 w-full ">
              
              <button
                onClick={(event) => handleAddToWishlist(event, product)}
                className="btn w-full bg-transparent border-gray-400 hover:border-gray-800 hover:bg-transparent rounded-sm text-gray-800 font-bold tracking-wide"
              >
                {isInWishlist(product.id) ? (
                  <FaHeart className="h-5 w-5 text-red-500" />
                ) : (
                  <FaRegHeart className="h-5 w-5 text-gray-600" />
                )}
               ADD TO WISHLIST
              </button>
            </div>
            <div className="w-full h-[1px] bg-gray-500 mt-5"></div>
            <DeliveryOptions />
            <BestOffers />
            <div className="w-full h-[1px] bg-gray-500 mt-5"></div>
            <ProductDetails description={product.description} />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-500 mt-5"></div>
        <div className="flex items-center w-full flex-col lg:flex-row gap-5 justify-around">
          <Ratings rate={product.rating.rate} count={product.rating.count} />
          <CustomerFeedback count={product.rating.count} />
        </div>

        <div className="text-gray-800 mt-5">
          <a className="font-semibold text-rose-500 cursor-pointer">
            View all {product.rating.count} reviews
          </a>
          <p>
            Product Code:{" "}
            <span className="font-semibold text-gray-800">{product.id}</span>
          </p>
          <p>
            Seller: <span className="font-semibold text-rose-500">Mintra</span>
          </p>
          <p className="font-semibold">View Supplier Information</p>
        </div>
        <div className="mt-5 w-full">
          <p className="text-md font-bold tracking-wide mb-5 text-gray-800">
            SIMILAR PRODUCTS
          </p>
          <Suggestion />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
