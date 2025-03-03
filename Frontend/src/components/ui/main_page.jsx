import React, { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import ProductCard from "./productCard";
import ProductForm from "./productForm";
import Modal from "./modal";
import { data, useNavigate } from "react-router-dom";
const MainPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [keypage, setkeypage] = useState(0);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const seller_id = userdata.userId;
  const username = userdata.username;
  async function getSellerProducts(seller_id) {
    try {
      console.log("entered Fectching");
      const response = await fetch(
        `https://e-commerce-app-jtd-y1b1.onrender.com/seller/getproducts/${seller_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Seller Products:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Example Usage:
  // Replace 123 with the actual seller_id
  async function fetchProducts() {
    const productData = await getSellerProducts(seller_id); // Await the promise
    if (productData) {
      setProducts(productData.formattedRows); // Ensure productData is defined before using it
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [seller_id]);
  useEffect(() => {
    fetchProducts();
  }, [keypage]);
  const handleAddProduct = (product) => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setkeypage(keypage + 1);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-jtd-y1b1.onrender.com/seller/deleteproduct/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove the product from state if deletion is successful
      alert("Product Deleted Successfully");
      setkeypage(keypage + 1);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 h-screen">
      <div className="flex gap-4 md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{username}'s Store</h1>
        <button className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 mt-4 md:mt-0">
          <User
            className="h-6 w-6"
            onClick={() => {
              navigate("/orders");
            }}
          />
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Shop</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 mb-4 md:mb-0"
        >
          Add Product
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm
          product={editingProduct}
          onSave={handleAddProduct}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
      {!isModalOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.Product_id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={() => {
                handleDeleteProduct(product.Product_id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
