const express = require("express");
const productController = require("../controllers/productsController");
const authenticateUser = require("../middleware/authenticateuser");
const authorizeUser = require("../middleware/authorizeUser");
const router = express.Router();

router.post(
  "/seller/addproduct",
  authenticateUser,
  authorizeUser(["Seller"]),
  productController.addProduct
);
router.get(
  "/user/getproducts",
  authenticateUser,
  authorizeUser(["User"]),
  productController.getallProducts
);
router.get(
  "/seller/getproducts/:sellerid",
  authenticateUser,
  authorizeUser(["Seller"]),
  productController.getSellerProducts
);
router.patch(
  "/seller/editproduct/:id",
  authenticateUser,
  authorizeUser(["Seller"]),
  productController.editproduct
);
router.delete(
  "/seller/deleteproduct/:id",
  authenticateUser,
  authorizeUser(["Seller"]),
  productController.deleteProduct
);
module.exports = router;
