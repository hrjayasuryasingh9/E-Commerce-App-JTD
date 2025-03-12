const productservices = require("../services/productServices");

const addProduct = async (req, res) => {
  const { seller_id, name, description, category, price, stock, sizes, image } =
    req.body;
  if (
    !seller_id ||
    !name ||
    !description ||
    !category ||
    !price ||
    !stock ||
    !sizes ||
    !image
  ) {
    return res
      .status(400)
      .json({ message: "Please enter the details for all the fields" });
  }
  try {
    const sizesAvailable = sizes;
    const result = await productservices.addProduct(
      seller_id,
      name,
      description,
      category,
      price,
      stock,
      sizesAvailable,
      image
    );
    res.status(200).json({
      Message: "The product has been added successfully",
      Productid: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Internal Server Error",
    });
  }
};

const getallProducts = async (req, res) => {
  try {
    const result = await productservices.getallProducts();

    const formattedRows = result.map((row) => ({
      Product_id: row.id,
      Seller: row.all_users_data?.name,
      Name: row.name,
      Description: row.description,
      Category: row.category,
      Price: Number(row.price),
      Stock: row.stock,
      Sizes: row.sizes,
      Image: row.image,
    }));
    if (result) {
      res.status(200).json({ Data: formattedRows });
    }
  } catch (error) {
    console.error("Database Query Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSellerProducts = async (req, res) => {
  const seller_id = Number(req.params.sellerid);
  try {
    const result = await productservices.getSellerProducts(seller_id);
    const formattedRows = result.map((row) => ({
      Product_id: row.id,
      Name: row.name,
      Description: row.description,
      Category: row.category,
      Price: Number(row.price),
      Stock: row.stock,
      Sizes: row.sizes,
      Image: row.image,
    }));
    if (result.length != 0) {
      res.status(200).json({ formattedRows });
    } else {
      res
        .status(500)
        .json({ Message: "No products Found With That seller Name" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const editproduct = async (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;
  if (!Object.keys(updates).length) {
    return res.status(400).json({ message: "Please enter a field to update" });
  }

  // Convert field names to lowercase
  const normalizedUpdates = {};
  Object.keys(updates).forEach((key) => {
    normalizedUpdates[key.toLowerCase()] = updates[key];
  });

  // Ensure `sizes` is stored as JSON (not a stringified object)
  if (normalizedUpdates["sizes"]) {
    normalizedUpdates["sizes"] = normalizedUpdates["sizes"]; // Prisma handles JSON directly
  }
  try {
    const result = await productservices.editproduct(id, normalizedUpdates);

    if (result.length != 0) {
      res.status(200).json({ message: "Product Edited Successfully" });
    } else {
      res.status(200).json({ message: "Error while updating the product" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const productID = Number(req.params.id);

  try {
    const result = await productservices.deleteProduct(productID);
    if (result.length === 0) {
      res.status(406).json({ message: "The products with id not found " });
    } else {
      res.status(200).json({ message: "The product is deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error " });
  }
};
module.exports = {
  addProduct,
  getallProducts,
  getSellerProducts,
  editproduct,
  deleteProduct,
};
