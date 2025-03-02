import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import productsJson from "./products.json";

function ProductViewComponent() {
  const location = useLocation();
  const { prodOverView, products } = location.state || {};
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (prodOverView) {
      const selectedProduct = products.find(
        (p) => p.Product_id === prodOverView
      );
      setProduct(selectedProduct);
    }
  }, [prodOverView]);

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <section className="h-[100vh] flex items-center">
      <section className="productsView grid  lg:grid-cols-[400px_1fr] md:grid-cols-[400px_1fr] grid-cols-1 gap-10 ">
        <aside className="flex flex-col items-center">
          <img
            src={product.Image}
            alt={product.Name}
            className="h-96 w-full object-cover"
          />
          <div className="flex flex-col md:flex-row justify-between items-center py-2 gap-2 w-full">
            <button className="h-16 bg-white shadow-lg hover:bg-yellow-400 w-full font-bold text-md text-black flex justify-center gap-2 items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <h1 className="text-lg md:text-md">ADD TO CART</h1>
            </button>
            <button className="h-16 bg-black shadow-lg hover:bg-orange-500 w-full font-bold text-md text-white flex justify-center gap-2 items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <h1 className="text-lg md:text-md">BUY NOW</h1>
            </button>
          </div>
        </aside>
        <aside className="p">
          <h1 className="text-2xl font-bold">{product.Name}</h1>
          <p className="text-gray-700 text-md">{product.Description}</p>
          <p className="text-xl font-semibold text-blue-600">
            ₹{product.Price}
          </p>
          <div className="flex gap-3">
            <p className="text-gray-600 font-bold">Category:</p>
            <p>{product.Category}</p>
          </div>
          <div className="flex  gap-3">
            <p className="text-gray-600 font-bold">Available Sizes: </p>
            <p>{product.Sizes.join(", ")}</p>
          </div>
          <div className="flex gap-3">
            <p className="text-gray-600 font-bold">Stock: </p>
            <p>{product.Stock}</p>
          </div>
          <div className="flex gap-3">
            <p className="text-gray-600 font-bold">Seller :</p>
            <p>{product.Seller}</p>
          </div>
        </aside>
      </section>
    </section>
  );
}

export default ProductViewComponent;
