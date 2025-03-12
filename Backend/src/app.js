require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRouetes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRouetes);
app.use("/api/orders", orderRoutes);
module.exports = app;
