const express = require("express");
const authenticateUser = require("../middleware/authenticateuser");
const authorizeUser = require("../middleware/authorizeUser");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.post(
  "/addproduct",
  authenticateUser,
  authorizeUser(["User"]),
  cartController.addProduct
);
router.get(
  "/getproducts/:uid",
  authenticateUser,
  authorizeUser(["User"]),
  cartController.getProducts
);
router.delete(
  "/deleteproduct/:cid",
  authenticateUser,
  authorizeUser(["User"]),
  cartController.deleteProduct
);

module.exports = router;
