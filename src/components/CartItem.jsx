import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import Modal from "./Modal";
import { FaAngleRight, FaPlus, FaMinus } from "react-icons/fa";
import Suggestion from "./Suggestion";
import { TbBadge } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import CartHeader from "./CartHeader";

// Helper function to format price in Indian Rupees
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

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
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [Finaltotal, setFinalTotal] = useState(0);
  const [discount, setDiscount] = useState(100); // Example: Default discount
  const [shippingFee, setShippingFee] = useState(0);

  const conversionRate = 83.36; // Conversion rate for USD to INR
  const freeShippingThreshold = 2000; // Example: Threshold for free shipping in INR

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice =
        selectedItems.reduce((sum, id) => {
          const item = cart.find((product) => product.id === id);
          return sum + (item ? item.price * (item.quantity || 1) : 0); // Ensure quantity is valid
        }, 0) * conversionRate;
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
  }, [cart, selectedItems, discount, shippingFee]);

  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    if (selectedItems.includes(productId)) {
      // Ensure that selectedItems is updated correctly
      const updatedItems = selectedItems.map((id) =>
        id === productId ? productId : id
      );
      setSelectedItems(updatedItems);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setSelectedItems(selectedItems.filter((id) => id !== productId));
    toast.info("Item removed from cart");
  };

  const handleMoveToWishlist = (product) => {
    addToWishlist(product);
    removeFromCart(product.id);
    setSelectedItems(selectedItems.filter((id) => id !== product.id));
    toast.success("Item moved to wishlist");
  };

  const toggleSelectItem = (productId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId]
    );
  };

  const handleBulkRemove = () => {
    selectedItems.forEach(handleRemove);
    setSelectedItems([]);
  };

  const handleBulkMoveToWishlist = () => {
    selectedItems.forEach((id) => {
      const product = cart.find((item) => item.id === id);
      if (product) {
        handleMoveToWishlist(product);
      }
    });
    setSelectedItems([]);
  };

  const toggleAllItems = () => {
    setSelectedItems(
      cart.length === selectedItems.length ? [] : cart.map((item) => item.id)
    );
  };

  return (
    <>
      <Header
        className="bg-white"
        textColor="text-gray-800"
        showCategories={false}
        showCart={false}
        showWishlist={true}
        showMenu={false}
        showUser={false}
      />

      <div className="h-full mx-auto container flex flex-col items-center mt-20">
        <CartHeader />

        <div className="flex items-center justify-between w-[80vw]">
          <label className="cursor-pointer label gap-5">
            <input
              type="checkbox"
              className="checkbox checkbox-accent"
              checked={selectedItems.length === cart.length}
              onChange={toggleAllItems}
            />
            <span className="label-text tracking-wide text-lg font-semibold text-gray-800">
              {selectedItems.length}/{cart.length} ITEMS SELECTED
            </span>
          </label>
          <div className="text-gray-400 flex gap-5">
            <button onClick={handleBulkRemove}>REMOVE</button>
            <div className="w-[2px] h-5 bg-gray-400"></div>
            <button onClick={handleBulkMoveToWishlist}>MOVE TO WISHLIST</button>
          </div>
        </div>

        <div className="w-[80vw] bg-white border border-gray-300 p-3 mx-5 my-5">
          {cart.length > 0 ? (
            cart.map((product) => {
              const isInWishlist = wishlist.some(
                (item) => item.id === product.id
              );
              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between py-2 border-b border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => toggleSelectItem(product.id)}
                    />
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
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
                  <div className="flex items-center gap-2">
                    <button
                      className="text-xs text-red-500 font-semibold"
                      onClick={() => handleRemove(product.id)}
                    >
                      REMOVE
                    </button>
                    {!isInWishlist && (
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
              );
            })
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-800 uppercase font-semibold tracking-wide">
                Your cart is empty.
              </p>
            </div>
          )}
        </div>

        {selectedItems.length > 0 && (
          <>
            <div className="w-[80vw] bg-white border border-gray-300 p-3 mx-5 my-5">
              <p className="text-lg tracking-wide font-semibold text-gray-800">
                PRICE DETAILS ({selectedItems.length} item
                {selectedItems.length > 1 ? "s" : ""})
              </p>
              <div className="flex justify-between py-2">
                <p className="text-gray-800">Total MRP</p>
                <p className="text-gray-800">{formatPrice(Finaltotal)}</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="text-gray-800">Discount on MRP</p>
                <p className="text-gray-800">{formatPrice(discount)}</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="text-gray-800">Coupon Discount</p>
                <button className="text-blue-500">Apply Coupon</button>
              </div>
              <div className="flex justify-between py-2">
                <p className="text-gray-800">Platform Fee</p>
                <p className="text-gray-800">FREE</p>
              </div>
              <div className="flex justify-between py-2">
                <div className="flex ">
                  <p className="text-gray-800">Shipping Fee</p>
                  {total < 2000 && (
                    <div
                      className="badge badge-secondary badge-xs tooltip"
                      data-tip="Free shipping for orders over ₹2000"
                    >
                     
                    </div>
                  )}
                </div>

                <p className="text-gray-800">{formatPrice(shippingFee)}</p>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <p className="text-gray-800">Total Amount</p>
                <p className="text-gray-800">{formatPrice(total)}</p>
              </div>
            </div>

            <div className="w-[80vw] flex justify-end mt-4">
              <button className="btn btn-primary">PLACE ORDER</button>
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
      </div>
      <ToastContainer />
    </>
  );
}

export default CartItem;
