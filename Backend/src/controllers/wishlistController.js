const wishlistservices = require("../services/wishlistServices");

const addProduct = async (req, res) => {
  const pid = Number(req.body.pid);
  const uid = Number(req.body.uid);
  try {
    const result = await wishlistservices.addProduct(pid, uid);
    res.status(200).json({
      message: "The Product added To wishlist successfully",
      wishlistid: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProducts = async (req, res) => {
  const uid = Number(req.params.uid);
  try {
    const result = await wishlistservices.getWishlistItems(uid);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const cid = Number(req.params.cid);
  try {
    const result = await wishlistservices.deleteWishlistItem(cid);
    res.status(200).json({ message: "wishlist Item Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { addProduct, getProducts, deleteProduct };
