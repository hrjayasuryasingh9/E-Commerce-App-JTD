const express = require("express");
const authenticateUser = require("../middleware/authenticateuser");
const authorizeUser = require("../middleware/authorizeUser");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post(
  "/user/addorder",
  authenticateUser,
  authorizeUser(["User"]),
  orderController.addOrder
);
router.get(
  "/user/getorders/:id",
  authenticateUser,
  authorizeUser(["User"]),
  orderController.getOrders
);
router.get(
  "/seller/getorders/:id",
  authenticateUser,
  authorizeUser(["Seller"]),
  orderController.getOrdersofSeller
);
router.delete(
  "/user/deleteorder/:order_id",
  authenticateUser,
  authorizeUser(["User"]),
  orderController.deleteOrder
);
router.patch(
  "/seller/editstatus/:order_id",
  authenticateUser,
  authorizeUser(["Seller"]),
  orderController.editStatus
);
module.exports = router;
