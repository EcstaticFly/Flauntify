const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const paypal = require('../../helpers/paypal')
const Razorpay = require("razorpay");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_ID_KEY,
//   key_secret: process.env.RAZORPAY_SECRET_KEY
// });

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId
    } = req.body;

    const create_payment_json = {
      intent : "sale",
      payer : {
        payment_method : "paypal",
      },
      redirect_urls : {
        return_url : "http://localhost:5173/shop/paypal-return",
        cancel_url : "http://localhost:5173/shop/paypal-cancel"
      },
      transactions : [
        {
          item_list : {
            items : cartItems.map(item => ({
              name : item.title,
              sku : item.productId,
              price : item.price.toFixed(2),
              currency : 'USD',
              quantity : item.quantity
            }))
          },
          amount :{
            currency : 'USD',
            total : totalAmount.toFixed(2)
          },
          description : 'Product'
        }
      ]
    }

    paypal.payment.create(create_payment_json,async(err, paymentInfo) => {
      if (!err) {
        const newOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });
        await newOrder.save();
        const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;


        res.status(200).json({
          success: true,
          approvalURL,
          orderId : newOrder._id,
        });
      } else {
        res.status(400).json({ success: false, message: "Something went wrong!" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
};

const capturePayment = async (req, res) => {
  try{
    const {paymentId, payerId, orderId} = req.body;
    let order = await Order.findById(orderId);
    if(!order){
      return res.status(404).json({success: false, message: "Order not found!"})
    }
    
    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.payerId = payerId;
    order.paymentId = paymentId;

    const currentCartId = order.cartId;
    await Cart.findByIdAndDelete(currentCartId);

    await order.save();
    res.status(200).json({
      success: true,
      message : 'Order confirmed',
      data : order
    });

  }catch(error){
    console.log(error.message);
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
};

const getAllOrdersByUser = async(req,res)=>{
  try{

    const {userId} = req.params;
    const orders = await Order.find({userId});
    if(!orders.length){
      return res.status(404).json({
        success: false,
        message: "No orders found for this user"
      })
    }

    res.status(200).json({
      success: true,
      data : orders
    });

  }catch(error){
    console.log(error.message);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
}

const getOrderDetails = async(req,res)=>{
  try{
    const {id} = req.params;
    const currentOrder = await Order.findById(id);
    if(!currentOrder){
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }
    res.status(200).json({
      success: true,
      data : currentOrder
    });

  }catch(error){
    console.log(error.message);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
}

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
