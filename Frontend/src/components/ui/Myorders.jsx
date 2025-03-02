import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { data, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
const ProductCard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const userId = userdata.userId;
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `https://e-commerce-app-jtd.onrender.com/user/getorders/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch orders");

      const orders = await response.json();
      console.log("Orders:", orders);
      setProducts(orders.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setProducts([]);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [userId]);

  useEffect(() => {
    fetchOrders();
  }, [refreshKey]);
  const handleDecline = async (index) => {
    const updatedProducts = [...products];
    const orderId = updatedProducts[index].order_id; // Extract order_id

    try {
      const response = await fetch(
        `https://e-commerce-app-jtd.onrender.com/user/deleteorder/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <section className="fixed w-full grid sm:grid-cols-2  grid-cols-[auto_auto] items-center p-2 py-6 border-b-gray-300 border-b bg-white z-20">
        <div className="flex items-center gap-6">
          <div
            onClick={() => {
              navigate("/maincomponent");
            }}
            className="cursor-pointer"
          >
            <h1 className="font-bold text-xl">𝓙𝓽𝓭</h1>
          </div>
        </div>

        <div className="relative flex gap-4 ml-auto cursor-pointer">
          <div
            onClick={() => {
              navigate("/CartComponent");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <div className="absolute -top-5 left-3 bg-black text-white rounded-full px-2 font-bold"></div>
          </div>
          <div
            onClick={() => {
              navigate("/mywishlist");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <div>
            <User
              className="size-6"
              onClick={() => {
                navigate("/myorders");
              }}
            />
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center pt-19 bg-gray-100 w-full">
        <div className="flex pl-6 pt-2">
          <h1 className="font-sans font-semibold text-5xl pb-2">My orders</h1>
        </div>
        <div className="w-full justify-center min-h-screen bg-gray-100 flex flex-wrap gap-6 p-6">
          {products.map((product, index) => (
            <div
              key={product.order_id}
              className="bg-white border border-gray-300 p-4 rounded-xl shadow-md w-64 text-center transform transition duration-300 hover:scale-105 flex flex-col justify-between h-[70vh] max-h-[70vh]"
            >
              <img
                src={product.product_image}
                alt={product.name}
                className="h-60 rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(product.product_image)}
              />
              <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 font-bold">₹{product.price}</p>
              {/* <p className="text-gray-500">Seller: {product.Seller}</p> */}
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {product.sizes.map((size, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-md"
                  >
                    {size}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-700 flex-grow mt-2">
                {product.description && product.description.length > 50 ? (
                  <>
                    {product.description.slice(0, 50)}...
                    <span
                      className="text-blue-500 underline cursor-pointer"
                      onClick={() => setShowFullDescription(index)}
                    >
                      View More
                    </span>
                  </>
                ) : (
                  product.Description
                )}
              </p>
              {product.shifted === false && (
                <p className="text-red-600 font-bold mt-2">No stock for</p>
              )}
              {product.shifted === true && (
                <p className="text-green-600 font-bold mt-2">Shifted ✅</p>
              )}

              {product.status === "Dispatched" ? (
                <span className="text-green-600  font-semibold py-10 text-2xl">
                  Shipped
                </span>
              ) : product.status === "Declined" ? (
                <span className="text-red-600 font-semibold py-10 text-2xl">
                  Declined
                </span>
              ) : (
                <div className="flex flex-col gap-2 mt-auto">
                  <span className="text-blue-600 font-semibold py-2 text-2xl">
                    Pending
                  </span>
                  <button
                    className="w-full bg-red-600 text-white py-2 rounded-md font-semibold border border-red-700 hover:bg-red-700 transition"
                    onClick={() => handleDecline(index)}
                    disabled={product.shifted}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {showFullDescription !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center">
                <h3 className="text-lg font-bold">
                  {products[showFullDescription].name}
                </h3>
                <p className="mt-4 text-gray-600">
                  {products[showFullDescription].description}
                </p>
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowFullDescription(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4"></div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductCard;
