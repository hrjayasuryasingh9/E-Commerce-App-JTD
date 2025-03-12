const express = require("express");
const authenticateUser = require("../middleware/authenticateuser");
const authorizeUser = require("../middleware/authorizeUser");
const wishlistCOntroller = require("../controllers/wishlistController");

const router = express.Router();

router.post(
  "/addproduct",
  authenticateUser,
  authorizeUser(["User"]),
  wishlistCOntroller.addProduct
);
router.get(
  "/getproducts/:uid",
  authenticateUser,
  authorizeUser(["User"]),
  wishlistCOntroller.getProducts
);
router.delete(
  "/deleteproduct/:cid",
  authenticateUser,
  authorizeUser(["User"]),
  wishlistCOntroller.deleteProduct
);

module.exports = router;
