const Order = require("../../models/Order");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const allOrders = await Order.find({});
    if (!allOrders) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: allOrders,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const getOrderDetailsforAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const currentOrder = await Order.findById(id);
    if (!currentOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      data: currentOrder,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const currentOrder = await Order.findById(id);
    if (!currentOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndUpdate(id, {
      orderStatus,
    });
    res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsforAdmin,
  updateOrderStatus,
};
