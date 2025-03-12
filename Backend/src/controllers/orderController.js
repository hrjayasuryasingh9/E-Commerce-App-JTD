const orderServices = require("../services/orderServices");

const addOrder = async (req, res) => {
  const sellername = req.body.seller;
  const pid = Number(req.body.pid);
  const uid = Number(req.body.uid);
  const quantity = Number(req.body.quantity);
  try {
    const sellerinfo = await orderServices.getsellerdetails(sellername);
    console.log(sellerinfo);
    const sid = sellerinfo.id;

    const result = await orderServices.addOrder(sid, pid, uid, quantity);

    res
      .status(200)
      .json({ message: "Order Added Successfully", orderID: result.order_id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrders = async (req, res) => {
  const uid = Number(req.params.id);
  try {
    const data = await orderServices.getOrders(uid);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrdersofSeller = async (req, res) => {
  const uid = Number(req.params.id);
  try {
    const data = await orderServices.getOrdersofSeller(uid);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteOrder = async (req, res) => {
  const order_id = Number(req.params.order_id);
  try {
    const data = await orderServices.deleteOrder(order_id);
    res.status(200).json({ message: "Order deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editStatus = async (req, res) => {
  const order_id = Number(req.params.order_id);
  const status = req.body.status;
  try {
    const result = await orderServices.editStatus(order_id, status);
    res.status(200).json({ message: `The order ${status} successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  addOrder,
  getOrders,
  getOrdersofSeller,
  deleteOrder,
  editStatus,
};
