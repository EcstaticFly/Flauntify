const express = require("express");

const {getAllOrdersOfAllUsers,getOrderDetailsforAdmin,updateOrderStatus} = require("../../controllers/admin/order-controller");


const router = express.Router();
router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsforAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
