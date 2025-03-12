import { useEffect, useState } from "react";

function CartComponent() {
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const quantity = 1;
  async function fetchCartProducts() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) {
        alert("User not found. Please login first.");
        return;
      }

      const userId = user.userId;

      const response = await fetch(
        `https://e-commerce-app-jtd-b0ky.onrender.com/api/cart/getproducts/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Cart products fetched successfully:", data);
        setProducts(data.data || []);
      } else {
        alert(data.message || "Failed to fetch cart products.");
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
      alert("An error occurred while fetching cart products.");
    }
  }
  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    const totalAmount = products.reduce(
      (acc, prod) => acc + prod.price * (prod.quantity || 1),
      0
    );
    setAmount(totalAmount);
  }, [products]);
  useEffect(() => {
    fetchCartProducts();
  }, [refreshKey]);
  const placeorder = async (cart, quantity) => {
    let orderedProductNames = [];
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) {
        alert("User not found. Please login first.");
        return;
      }

      const userId = user.userId;
      try {
        const response = await fetch(
          `https://e-commerce-app-jtd-b0ky.onrender.com/api/orders/user/addorder`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              sellername: product.seller,
              pid: product.id,
              uid: userId,
              quantity: quantity,
            }),
          }
        );

        if (response.ok) {
          console.log(`Order placed for: ${product.name}`);
          orderedProductNames.push(product.name);
          // Remove product from cart after successful order
          removeFromCart(product.cid);
          setRefreshKey(async (prevKey) => prevKey + 1);
        } else {
          console.error(`Failed to place order for: ${product.name}`);
        }
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }

    console.log("All orders processed. Updated cart:", products);
    alert(`Ordered Products:\n${orderedProductNames.join("\n")}`);
  };
  const removeFromCart = async (cartId) => {
    try {
      console.log("Cart ID received in removeFromCart:", cartId);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) {
        alert("User not found. Please login first.");
        return;
      }

      const response = await fetch(
        `https://e-commerce-app-jtd-b0ky.onrender.com/api/cart/deleteproduct/${cartId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Product removed successfully");

        // Check existing cart items
        console.log("Before removal:", products);

        const updatedCart = products.filter((prod) => prod.cid !== cartId);
        setProducts(updatedCart);
        console.log("After removal:", updatedCart);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to remove product from cart.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      alert("An error occurred while removing the product.");
    }
  };

  return (
    <>
      <section className="h-[100vh] bg-slate-50">
        <div className="h-16 bg-white border-b-gray-300 border-b font-bold text-md text-black flex gap-4 items-center px-4">
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
          <h1 className="text-lg md:text-md">YOUR CART</h1>
        </div>
        <section className="yourCart grid grid-cols-1 md:grid-cols-[1fr_400px] p-4 gap-2 shadow-lg h-[95vh]">
          <aside className="shadow-lg rounded-lg overflow-y-auto bg-white">
            <ul className="flex flex-col">
              {products.slice().map((prod) => (
                <li
                  key={prod.cid}
                  className="flex gap-2 border-b-gray-300 border-b p-2"
                >
                  <img
                    width="100px"
                    height="100px"
                    src={prod.image}
                    alt={prod.name}
                    className="md:w-38 md:h-auto"
                  />
                  <div>
                    <h1 className="font-bold">{prod.name}</h1>
                    <p className="line-clamp-1 text-gray-700">
                      {prod.description}
                    </p>
                    <h1 className="font-bold">₹ {prod.price}</h1>
                    <p className="font-bold">
                      Qty:
                      <input
                        type="number"
                        className="ml-2 border rounded px-2 py-1 w-16 text-center"
                        min="1"
                        defaultValue="1"
                      />{" "}
                    </p>
                    <div className="flex">
                      <h1 className="font-bold text-green-600">Stock :</h1>
                      <h1>{prod.stock}</h1>
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        onClick={() => removeFromCart(prod.cid)}
                        className="bg-red-500 hover:bg-red-600 rounded-md text-white font-bold px-3 py-1 mt-2 shadow-lg cursor-pointer"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => placeorder([prod], quantity)}
                        className="bg-black rounded-md text-white font-bold px-3 py-1 mt-2 ml-1 shadow-lg cursor-pointer"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
          <aside className="shadow-lg border-gray-100 border p-2 h-40 rounded-lg flex flex-col justify-between bg-white">
            <h1 className="font-bold">Cart Details</h1>
            <div className="flex justify-between items-center">
              <div className="font-bold">
                <h1>Total Amount :</h1>
                <h1>₹ {amount}</h1>
              </div>
              <button
                className="bg-black text-white font-bold p-3 shadow-lg cursor-pointer hover:bg-blue-600"
                onClick={() => {
                  placeorder(products, quantity);
                }}
              >
                Place Order
              </button>
            </div>
          </aside>
        </section>
      </section>
    </>
  );
}

export default CartComponent;
