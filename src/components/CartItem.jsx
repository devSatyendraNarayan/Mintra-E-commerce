import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import Announcement from "./Announcement";
import PriceDetails from "./PriceDetails";
import { formatPrice } from "../utils/Helpers";
import { FaPlus, FaMinus, FaAngleRight } from "react-icons/fa";
import Suggestion from "./Suggestion";
import { TbBadge } from "react-icons/tb";
import { Link } from "react-router-dom";

function QuantitySelector({ productId, quantity, onChange }) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onChange(quantity + 1);
  };

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      onChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="leading-10 text-gray-600 transition hover:opacity-75"
        onClick={handleDecrease}
      >
        <FaMinus />
      </button>
      <input
        type="number"
        id={`quantity-${productId}`}
        value={quantity}
        onChange={handleChange}
        className="h-10 w-16 rounded border border-gray-800 bg-white text-center sm:text-sm"
        min="1"
      />
      <button
        type="button"
        className="leading-10 text-gray-600 transition hover:opacity-75"
        onClick={handleIncrease}
      >
        <FaPlus />
      </button>
    </div>
  );
}

function CartItem() {
  const { cart, removeFromCart, updateQuantity, placeOrder } = useContext(CartContext);
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const [total, setTotal] = useState(0);
  const [Finaltotal, setFinalTotal] = useState(0);
  const [discount, setDiscount] = useState(100);
  const [shippingFee, setShippingFee] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState("cart");

  const conversionRate = 83.36;
  const freeShippingThreshold = 2000;

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = cart.reduce((sum, product) => {
        return sum + product.price * (product.quantity || 1) * conversionRate;
      }, 0);
      setFinalTotal(totalPrice);

      const totalPriceWithDiscount = totalPrice - discount;

      const cartTotalInINR = totalPriceWithDiscount;
      if (cartTotalInINR >= freeShippingThreshold) {
        setShippingFee(0);
      } else {
        setShippingFee(79);
      }

      const finalTotal = Math.max(0, totalPriceWithDiscount + shippingFee);
      setTotal(finalTotal);
    };

    calculateTotal();
  }, [cart, discount, shippingFee]);

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleMoveToWishlist = (product) => {
    addToWishlist(product);
    removeFromCart(product.id);
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      items: cart.map((product) => ({
        id: product.id,
        image:product.image,
        title: product.title,
        price: product.price*83.36,
        quantity: product.quantity,
      })),
      total,
      Finaltotal,
      discount,
      shippingFee,
      createdAt: new Date(),
    };

    // Log each field to check for undefined values
    console.log("Order Details:", orderDetails);
    console.log("Items:", orderDetails.items);
    console.log("Total:", orderDetails.total);
    console.log("Finaltotal:", orderDetails.Finaltotal);
    console.log("Discount:", orderDetails.discount);
    console.log("Shipping Fee:", orderDetails.shippingFee);
    console.log("Created At:", orderDetails.createdAt);

    placeOrder(orderDetails);
  };

  return (
    <>
      <Header
        className="bg-white shadow-none border-b-2"
        textColor="text-gray-800"
        showCategories={false}
        showCart={false}
        showWishlist={true}
        showMenu={false}
        showUser={false}
      />
      <Announcement
        message="Payday Party Ends In"
        deadline={new Date("2024-07-20T00:00:00")}
        messageWhenExpired="The party has ended. Thank you for joining us!"
      />
      <div className="h-full mx-auto container flex flex-col items-center mt-5">
        {checkoutStep === "cart" && (
          <>
            <div className="w-[80vw] bg-white border border-gray-300 p-3 mx-5 my-5">
              {cart.length > 0 ? (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between py-2 border-b border-gray-200"
                  >
                    <div className="flex items-center space-x-5">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-contain"
                      />
                      <div className="flex flex-col justify-start">
                        <p className="text-gray-800 font-semibold">
                          {product.title}
                        </p>
                        <QuantitySelector
                          productId={product.id}
                          quantity={product.quantity || 1}
                          onChange={(newQuantity) =>
                            handleQuantityChange(product.id, newQuantity)
                          }
                        />
                        <p className="text-gray-700 mt-1">
                          Total:{" "}
                          {formatPrice(
                            product.price *
                              conversionRate *
                              (product.quantity || 1)
                          )}
                        </p>
                      </div>
                    </div>

                    <div></div>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs text-red-500 font-semibold"
                        onClick={() => handleRemove(product.id)}
                      >
                        REMOVE
                      </button>
                      {!wishlist.some((item) => item.id === product.id) && (
                        <>
                          <div className="w-px h-4 bg-gray-400"></div>
                          <button
                            className="text-xs text-gray-600 font-semibold"
                            onClick={() => handleMoveToWishlist(product)}
                          >
                            MOVE TO WISHLIST
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-800 uppercase font-semibold tracking-wide">
                    Your cart is empty.
                  </p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <>
                <PriceDetails
                  cart={cart}
                  Finaltotal={Finaltotal}
                  discount={discount}
                  shippingFee={shippingFee}
                  total={total}
                />
                <div className="w-[80vw] flex justify-end mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={handlePlaceOrder}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </>
            )}

            <Link
              to="/wishlist"
              className="btn w-[80vw] btn-ghost cursor-pointer h-fit tracking-wide text-gray-800 font-semibold flex flex-row items-center justify-between bg-white border border-gray-300 p-3 mx-5 my-5"
            >
              <div className="flex items-center gap-2">
                <TbBadge className="text-xl" />
                <p>Add More From Wishlist</p>
              </div>
              <FaAngleRight className="text-xl" />
            </Link>

            <Suggestion />
          </>
        )}
      </div>
    </>
  );
}

export default CartItem;
