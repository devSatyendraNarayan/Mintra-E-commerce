import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../contexts/Firebase"; // Adjust the path as necessary
import { doc, getDoc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true); // State to track loading

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchCart(firebaseUser.uid);
        fetchOrders(firebaseUser.uid); // Fetch orders when user is authenticated
      } else {
        setUser(null);
        setCart([]);
        setOrderedProducts([]); // Clear ordered products when user logs out
        setLoadingOrders(false); // Stop loading if user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCart = async (uid) => {
    try {
      const cartRef = doc(db, "users", uid, "cart", "cart");
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        setCart(cartDoc.data().items);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to fetch cart data.");
    }
  };

  const updateCartInFirestore = async (newCart) => {
    try {
      const cartRef = doc(db, "users", user.uid, "cart", "cart");
      await setDoc(cartRef, { items: newCart });
      setCart(newCart);
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart.");
    }
  };

  const addToCart = async (product) => {
    try {
      const cartRef = doc(db, "users", user.uid, "cart", "cart");
      const cartDoc = await getDoc(cartRef);

      let newCart = cartDoc.exists() ? cartDoc.data().items : [];

      if (newCart.some((item) => item.id === product.id)) {
        toast.warn("Product is already in the cart.");
        return;
      }

      newCart.push({ ...product, quantity: 1 });

      await updateCartInFirestore(newCart);
      toast.success("Product added to cart.");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const cartRef = doc(db, "users", user.uid, "cart", "cart");
      const cartDoc = await getDoc(cartRef);

      if (!cartDoc.exists()) {
        toast.error("Cart is empty.");
        return;
      }

      const updatedCart = cartDoc.data().items.filter((item) => item.id !== productId);

      await updateCartInFirestore(updatedCart);
      toast.info("Product removed from cart.");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove product from cart.");
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const cartRef = doc(db, "users", user.uid, "cart", "cart");
      const cartDoc = await getDoc(cartRef);

      if (!cartDoc.exists()) {
        toast.error("Cart is empty.");
        return;
      }

      const updatedCart = cartDoc.data().items.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );

      await updateCartInFirestore(updatedCart);
      toast.success("Product quantity updated.");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update product quantity.");
    }
  };

  const placeOrder = async (orderDetails) => {
    try {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const newOrderRef = await addDoc(ordersRef, orderDetails);

      // Update orderedProducts state with the new order
      setOrderedProducts((prevOrderedProducts) => [
        ...prevOrderedProducts,
        { id: newOrderRef.id, ...orderDetails },
      ]);

      // Clear the cart after placing the order
      await updateCartInFirestore([]);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  const fetchOrders = async (uid) => {
    try {
      const ordersRef = collection(db, "users", uid, "orders");
      const querySnapshot = await getDocs(ordersRef);
      const fetchedOrders = [];

      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() });
      });

      setOrderedProducts(fetchedOrders);
      setLoadingOrders(false); // Set loading to false once orders are fetched
    } catch (error) {
      console.error("Error fetching orders:", error);
      // toast.error("Failed to fetch orders.");
      setLoadingOrders(false); // Set loading to false on error
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        placeOrder,
        orderedProducts,
        fetchOrders,
        loadingOrders, // Pass loading state to handle loading UI in components
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
