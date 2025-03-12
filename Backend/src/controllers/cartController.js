const cartServices = require("../services/cartServices");

const addProduct = async (req, res) => {
  const pid = Number(req.body.pid);
  const uid = Number(req.body.uid);
  try {
    const result = await cartServices.addProduct(pid, uid);
    res.status(200).json({
      message: "The Product added To cart successfully",
      cartID: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProducts = async (req, res) => {
  const uid = Number(req.params.uid);
  try {
    const result = await cartServices.getCartItems(uid);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const cid = Number(req.params.cid);
  try {
    const result = await cartServices.deleteCartItem(cid);
    res.status(200).json({ message: "Cart Item Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { addProduct, getProducts, deleteProduct };
