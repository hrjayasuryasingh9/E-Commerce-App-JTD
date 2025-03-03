import React, { useEffect, useState } from "react";
// const productsData = [

//   {
//     "Name": "Denim Shirt",
//     "Price": 1999,
//     "Category": "Men Fashion",
//     "Seller": "Vivek",
//     "Image": "https://i.pinimg.com/736x/83/fe/9f/83fe9f4d92450e804b0117f52c38e83d.jpg",
//     "Sizes": ["XL", "L", "S", "M"],
//     "Description": "Upgrade your wardrobe with this versatile denim shirt, designed for a perfect blend of style and comfort. Crafted from high-quality, breathable cotton denim, this shirt offers durability while maintaining a soft and comfortable feel. The classic button-down design with a pointed collar and full sleeves adds a touch of sophistication, making it suitable for both casual and semi-formal occasions.",
//     "Stock": 20,
//     "shifted": null
//   },
//   {
//     "Name": "Formal Shirt",
//     "Price": 1299,
//     "Category": "Men Fashion",
//     "Seller": "Surya",
//     "Image": "https://i.pinimg.com/736x/c6/51/ef/c651efb1f503193963659cda76ea48a1.jpg",
//     "Sizes": ["L", "S", "M"],
//     "Description": "Elevate your professional wardrobe with this premium formal shirt, designed for a sleek and sophisticated look. Tailored from high-quality, breathable fabric, it offers exceptional comfort and a refined fit, making it perfect for office wear, business meetings, or formal occasions.",
//     "Stock": 30,
//     "shifted": null
//   },
//   {
//     "Name": "Baggy Shirt",
//     "Price": 1899,
//     "Category": "Men Fashion",
//     "Seller": "Surya",
//     "Image": "https://i.pinimg.com/736x/8e/a4/ed/8ea4edeb082475d686f75dd341fd74b4.jpg",
//     "Sizes": ["L", "S", "M"],
//     "Description": "Stay effortlessly stylish with this baggy shirt, designed for a loose, comfortable fit that blends fashion with freedom of movement. Made from soft, breathable fabric, it’s perfect for layering or wearing as a statement piece. Whether you're going for a streetwear vibe or a laid-back casual look, this oversized shirt is a must-have.",
//     "Stock": 34,
//     "shifted": null
//   },
//   {
//     "Name": "Hoodie layer Shirt",
//     "Price": 2099,
//     "Category": "Men Fashion",
//     "Seller": "Siva",
//     "Image": "https://i.pinimg.com/736x/c0/a0/7e/c0a07ed4ef6c78d9fe2361f61332dc6c.jpg",
//     "Sizes": ["L", "S", "M", "XL"],
//     "Description": "Upgrade your casual wardrobe with this hoodie layer shirt, combining the classic look of a button-down shirt with the cozy feel of a hoodie. Designed for a relaxed, modern fit, this piece is perfect for layering or wearing on its own, making it an ideal choice for transitional weather and streetwear fashion.",
//     "Stock": 26,
//     "shifted": null
//   },
//   {
//     "Name": "Baggy Hoodie",
//     "Price": 1799,
//     "Category": "Men Fashion",
//     "Seller": "Siva",
//     "Image": "https://i.pinimg.com/736x/58/76/d6/5876d65fd207aa8da56951e22ea153aa.jpg",
//     "Sizes": ["L", "S", "M", "XL", "XXL"],
//     "Description": "Stay cozy and stylish with this oversized baggy hoodie, designed for a relaxed, effortless fit that’s perfect for everyday wear. Crafted from soft, premium fabric, this hoodie provides warmth and breathability, making it a must-have for cooler days and streetwear-inspired outfits.",
//     "Stock": 34,
//     "shifted": null
//   },
//   {
//     "Name": "Sleeveless Hoodie",
//     "Price": 1599,
//     "Category": "Men Fashion",
//     "Seller": "Vivek",
//     "Image": "https://i.pinimg.com/736x/45/3f/29/453f29e286ee46f2c3b9de95d74b32bc.jpg",
//     "Sizes": ["L", "S", "M", "XL"],
//     "Description": "Stay cool and comfortable with this sleeveless hoodie, designed for a modern, athletic, and streetwear-inspired look. Made from lightweight, breathable fabric, it’s perfect for workouts, layering, or casual everyday wear. Whether you’re hitting the gym or styling a laid-back outfit, this hoodie is a must-have!",
//     "Stock": 37,
//     "shifted": null
//   },
//   {
//     "Name": "Half Sleeve Hoodie",
//     "Price": 1699,
//     "Category": "Men Fashion",
//     "Seller": "Vivek",
//     "Image": "https://i.pinimg.com/736x/b0/29/cb/b029cb12c0447bb07e4d3485b8cb63ce.jpg",
//     "Sizes": ["L", "S", "M", "XL", "XXL"],
//     "Description": "Stay stylish and comfortable with this half-sleeve hoodie, designed for a modern streetwear vibe and breathable comfort. Perfect for layering or wearing solo, this hoodie is crafted from soft, lightweight fabric, making it ideal for workouts, casual outings, or relaxed everyday wear.",
//     "Stock": 32,
//     "shifted": null
//   },
//   {
//     "Name": "Men Chord shirt and Bottom",
//     "Price": 2299,
//     "Category": "Men Fashion",
//     "Seller": "Surya",
//     "Image": "https://i.pinimg.com/736x/ea/67/38/ea673847a173f9b732c238d81e2f0389.jpg",
//     "Sizes": ["L", "S", "M", "XL"],
//     "Description": "Upgrade your style with this men’s cord set, a perfect blend of comfort and fashion. Designed for a coordinated and trendy look, this set includes a matching shirt and pants/shorts, crafted from premium fabric that ensures a relaxed yet stylish fit. Whether you're going for a casual, streetwear, or smart-casual vibe, this cord set has you covered!",
//     "Stock": 42,
//     "shifted": null
//   },
//   {
//     "Name": "Baggy Pant",
//     "Price": 1699,
//     "Category": "Men Fashion",
//     "Seller": "Surya",
//     "Image": "https://i.pinimg.com/736x/5e/d4/df/5ed4dfcffbca309b2d3ab1494757cfd7.jpg",
//     "Sizes": ["L", "S", "M", "XL"],
//     "Description": "Stay stylish and comfortable with these baggy pants, designed for a loose, relaxed fit that blends fashion with functionality. Made from premium, breathable fabric, these pants offer all-day comfort while giving off a trendy, streetwear-inspired vibe. Perfect for casual outings, lounging, or making a fashion statement!",
//     "Stock": 33,
//     "shifted": null
//   },
//   {
//     "Name": "Baggy Cargo Pant",
//     "Price": 1899,
//     "Category": "Men Fashion",
//     "Seller": "Surya",
//     "Image": "https://i.pinimg.com/736x/a7/60/81/a760815fa5287481af575db530ec8a01.jpg",
//     "Sizes": ["L", "S", "M", "XL", "XXL"],
//     "Description": "Get the perfect blend of fashion and function with these baggy cargo pants, designed for a relaxed fit and added utility. Made from durable, breathable fabric, these pants provide plenty of room for movement and stylish storage options, with multiple pockets to hold your essentials. Perfect for casual outings or outdoor adventures, these cargo pants bring comfort and practicality together.",
//     "Stock": 36,
//     "shifted": null
//   },
//   {
//     "Name": "Women Skirt",
//     "Price": 1299,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/48/ed/36/48ed367674c3a369c44a700b33e261bc.jpg",
//     "Sizes": ["L", "S", "M", "XXL"],
//     "Description": "Add a touch of elegance and flair to your wardrobe with this women’s skirt, designed to offer a perfect balance of style and comfort. Crafted from high-quality fabric, this skirt can easily be dressed up or down, making it ideal for a variety of occasions – from casual outings to more formal events.",
//     "Stock": 31,
//     "shifted": null
//   },
//   {
//     "Name": "Women Full Skirt",
//     "Price": 1899,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/ee/ae/63/eeae63533854eaf15597faea53d4ed18.jpg",
//     "Sizes": ["L", "S", "M", "XXL", "XL"],
//     "Description": "Embrace a classic, feminine look with this women’s full skirt, designed for maximum style and movement. Crafted from soft, flowy fabric, it offers a comfortable fit while creating a beautifully voluminous silhouette. Perfect for formal events, casual outings, or adding a touch of elegance to everyday wear.",
//     "Stock": 42,
//     "shifted": null
//   },
//   {
//     "Name": "Women Baggy Pants",
//     "Price": 1599,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/28/89/85/28898506de1397e5b5c758744bb701dc.jpg",
//     "Sizes": ["L", "M", "XXL"],
//     "Description": "Step into ultimate comfort and effortless style with these women’s baggy pants, designed for a loose, relaxed fit that’s perfect for casual days or laid-back outings. Made from soft, breathable fabric, these pants offer both comfort and style, giving you the freedom to move while keeping you on trend.",
//     "Stock": 51,
//     "shifted": null
//   },
//   {
//     "Name": "Women Baggy T-shirt",
//     "Price": 1299,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/12/45/44/124544141391d7d6a29d0989bbe7e4ca.jpg",
//     "Sizes": ["L", "M", "XXL","S","XL"],
//     "Description": "Stay relaxed and stylish with this women’s baggy shirt, designed for a loose, comfortable fit that’s perfect for casual wear or layering. Made from soft, breathable fabric, it offers a laid-back yet fashionable vibe, ideal for everyday outfits or a trendy streetwear look.",
//     "Stock": 23,
//     "shifted": null
//   },
//   {
//     "Name": "Women Short Skirt",
//     "Price": 1499,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/2a/d2/c2/2ad2c2c8a63dc0b9caa9a6aec5547a2f.jpg",
//     "Sizes": ["L", "M", "XXL","XL"],
//     "Description": "Add a playful touch to your wardrobe with this women’s short skirt, designed to offer a flattering fit and effortless style. Made from lightweight, breathable fabric, this skirt is perfect for warmer weather, offering both comfort and versatility for a variety of occasions, from casual outings to weekend adventures.",
//     "Stock": 15,
//     "shifted": null
//   },
//   {
//     "Name": "Women Collar Blouse",
//     "Price": 1299,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/16/ce/d7/16ced7ec0c44420ef2dc8a1aaf188fed.jpg",
//     "Sizes": ["L", "M", "XXL","XL"],
//     "Description": "Elevate your wardrobe with this women’s collar blouse, designed for a timeless, sophisticated look. Crafted from high-quality fabric, it offers a flattering fit while providing all-day comfort. Perfect for work, formal events, or a polished everyday style, this blouse is a wardrobe staple for any occasion.",
//     "Stock": 19,
//     "shifted": null
//   },
//   {
//     "Name": "Women Chords",
//     "Price": 1499,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/61/24/33/612433e25b4496ba1185d36c299b3549.jpg",
//     "Sizes": ["L", "M", "XXL","S"],
//     "Description": "Add a touch of texture to your wardrobe with these women’s corduroy pants, crafted from premium cord fabric for a soft yet durable feel. Offering a timeless style with a modern twist, these pants are perfect for adding warmth and style to any outfit, whether dressing up for the office or down for a casual day out.",
//     "Stock": 25,
//     "shifted": null
//   },
//   {
//     "Name": "Women Lenin Shirts",
//     "Price": 1299,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/54/f0/bd/54f0bde07c517635556b221c1ac21268.jpg",
//     "Sizes": ["L", "M", "XXL","S"],
//     "Description": "Stay cool and stylish with this women’s linen shirt, designed for ultimate comfort and breathability. Made from premium linen fabric, this shirt is perfect for warmer weather, offering a relaxed fit that keeps you feeling fresh and looking effortlessly chic. Ideal for both casual and semi-formal occasions, it’s a must-have addition to your wardrobe.",
//     "Stock": 27,
//     "shifted": null
//   },
//   {
//     "Name": "Women Short Tops",
//     "Price": 1199,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/e0/d4/f9/e0d4f9532f2e85a6cd5db44c93d1a3a5.jpg",
//     "Sizes": ["L", "M", "XXL","S"],
//     "Description": "Update your wardrobe with these women’s short tops, designed for a flirty, fashionable look. Made from soft, breathable fabric, these tops offer the perfect balance of style and comfort. Whether you're dressing for a day out with friends or just lounging at home, these short tops add a touch of effortless charm to any outfit.",
//     "Stock": 37,
//     "shifted": null
//   },
//   {
//     "Name": "Women Full Hand T-shirts",
//     "Price": 1399,
//     "Category": "Women Fashion",
//     "Seller": "Swetha",
//     "Image": "https://i.pinimg.com/736x/ff/a7/df/ffa7dfcbab0658bee998b4f2e71569f8.jpg",
//     "Sizes": ["L", "M", "XXL","S"],
//     "Description": "Stay cozy and fashionable with this women’s full sleeve t-shirt, designed for ultimate comfort and a classic fit. Made from soft, breathable fabric, this t-shirt offers full coverage with a relaxed yet flattering silhouette, perfect for cooler days or layering during any season.",
//     "Stock": 42,
//     "shifted": null
//   }
// ]
const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const sellerId = userdata.userId; // Declare sellerId properly
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `https://e-commerce-app-jtd.onrender.com/seller/getorders/${sellerId}`
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
  }, [sellerId]);

  useEffect(() => {
    fetchOrders();
  }, [refreshKey]);
  const handleDispatch = async (index) => {
    const updatedProducts = [...products];
    const orderId = updatedProducts[index].order_id; // Extract order_id

    try {
      const response = await fetch(
        `https://e-commerce-app-jtd-y1b1.onrender.com/seller/editproductstatus/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Dispatched",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      updatedProducts[index].shifted = true;
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDecline = async (index) => {
    const updatedProducts = [...products];
    const orderId = updatedProducts[index].order_id; // Extract order_id

    try {
      const response = await fetch(
        `https://e-commerce-app-jtd-y1b1.onrender.com/seller/editproductstatus/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Declined",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      updatedProducts[index].shifted = true;
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <div className=" bg-gray-100">
        <h1 className="text-3xl font-semibold text-gray-800 p-2 pl-7">
          My orders
        </h1>
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-wrap gap-6 p-6">
        {products.map((product, index) => (
          <div
            key={product.order_id}
            className="bg-white border border-gray-300 p-4 rounded-xl shadow-md w-64 text-center transform transition duration-300 hover:scale-105 flex flex-col justify-between h-[70vh] max-h-[70vh]"
          >
            <img
              src={product.product_image}
              alt={product.name}
              className="h-60 rounded-lg cursor-pointer"
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
                <button
                  className="w-full bg-black text-white py-2 rounded-md font-semibold border border-black hover:bg-gray-800 transition"
                  onClick={() => handleDispatch(index)}
                  disabled={product.shifted}
                >
                  Dispatch
                </button>
                <button
                  className="w-full bg-red-600 text-white py-2 rounded-md font-semibold border border-red-700 hover:bg-red-700 transition"
                  onClick={() => handleDecline(index)}
                  disabled={product.shifted}
                >
                  Decline
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
    </>
  );
};

export default ProductCard;
