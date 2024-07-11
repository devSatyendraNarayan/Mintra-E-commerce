import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { formatPrice } from "../utils/Helpers";
import Announcement from "../components/Announcement";
import Header from "../components/Header";

function OrderedProducts() {
  const { orderedProducts, fetchOrders } = useContext(CartContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchOrders()
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError(true);
      });
  }, [fetchOrders]);

  return (
    <>
    <Header
        className="bg-white shadow-none border-b-2"
        textColor="text-gray-800"
        showCategories={false}
        showCart={true}
        showWishlist={true}
        showMenu={true}
        showUser={true}
      />
      
       <div className="mx-auto container mt-20 pb-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Ordered Products</h2>
      {error && (
        <div className="flex items-center justify-center py-8">
          <p className="text-red-600 uppercase font-semibold tracking-wide">
            Failed to fetch orders. Please try again later.
          </p>
        </div>
      )}
      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderedProducts.length > 0 ? (
            orderedProducts.map((order) => (
              <div
                key={order.id}
                className="bg-white border h-fit border-gray-300 p-4 rounded-md shadow-md"
              >
                <div className="mb-4">
                  <p className="text-lg font-semibold mb-1 text-rose-500">Order Date: {order.createdAt.toDate().toLocaleDateString()}</p>
                  <p className="text-gray-700 text-sm">Order ID: {order.id}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {order.items.map((product) => (
                    <div key={product.id} className="flex items-center border-b border-gray-200 py-2">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-contain mr-2 rounded-md"
                      />
                      <div>
                        <p className="text-gray-800">{product.title}</p>
                        <p className="text-gray-700">
                          Price: {formatPrice(product.price)}
                        </p>
                        <p className="text-gray-700">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-gray-700">
                          Total: {formatPrice(product.price * product.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 mt-4">
                  Total Amount: {formatPrice(order.total)}
                </p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-800 uppercase font-semibold tracking-wide">
                No orders found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
    </>
   
  );
}

export default OrderedProducts;
