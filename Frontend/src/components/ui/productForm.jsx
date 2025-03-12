import React, { useState, useEffect } from "react";

const ProductForm = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [api, setApi] = useState(
    "https://e-commerce-app-jtd-b0ky.onrender.com/api/product/seller/addproduct"
  );
  const [method, setMethod] = useState("POST");
  const userdata = JSON.parse(localStorage.getItem("user"));
  const seller_id = userdata.userId;
  useEffect(() => {
    if (product) {
      setName(product.Name || "");
      setPrice(product.Price || "");
      setDescription(product.Description || "");
      setQuantity(product.Stock || "");
      setImage(product.Image || "");
      setCategory(product.Category || "");
      setSizes(product.Sizes || []);
      setApi(
        `https://e-commerce-app-jtd-b0ky.onrender.com/api/product/seller/editproduct/${product.Product_id}`
      ); // ✅ Fixed URL
      setMethod("PATCH");
    }
  }, [product]);

  const handleSizeChange = (size) => {
    setSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((s) => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      seller_id: seller_id,
      name: name,
      description: description,
      category: category,
      price: price,
      stock: quantity,
      sizes: sizes,
      image: image,
    };
    const productmain = {
      Name: name,
      Description: description,
      Category: category,
      Price: price,
      Stock: quantity,
      Sizes: sizes,
      Image: image,
    };
    console.log("Sending product data:", productData);

    try {
      const response = await fetch(api, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userdata.token}`,
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Product added successfully:", result);
        alert(
          product
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        onSave(productmain); // Call onSave to update state if needed
      } else {
        console.error("Error adding product:", result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-transparent p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {product ? "Edit Product" : "Add Product"}
      </h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        required
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        required
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        required
      />

      <div className="mb-4">
        <span className="block text-gray-700 mb-2">Select Sizes:</span>
        {["S", "M", "L", "XL", "XXL"].map((sizeOption) => (
          <label key={sizeOption} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              value={sizeOption}
              checked={sizes.includes(sizeOption)}
              onChange={() => handleSizeChange(sizeOption)}
              className="form-checkbox text-gray-600"
            />
            <span className="ml-2 text-gray-700">{sizeOption}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between">
        <button
          type="submit"
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200 mb-2 sm:mb-0"
        >
          {product ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
