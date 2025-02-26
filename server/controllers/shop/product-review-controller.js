const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res
        .status(403)
        .json({ success: false, message: "Purchase product to add review!" });
    }

    const checkExisitingReview = await ProductReview.findOne({
      productId,
      userId,
    });
    if (checkExisitingReview) {
      return res
        .status(403)
        .json({ success: false, message: "You already reviewed this product" });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();

    const allReviewsOfTheProduct = await ProductReview.find({ productId });
    const totalReviewsLength = allReviewsOfTheProduct.length;
    const averageReview =
      allReviewsOfTheProduct.reduce(
        (sum, reviewItem) => sum + reviewItem.reviewValue,
        0
      ) / totalReviewsLength;
    await Product.findByIdAndUpdate(productId, { averageReview });
    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      data: newReview,
    });
  } catch (error) {
    console.error(error, message);
    res
      .status(500)
      .json({ success: false, message: "Error adding product review" });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ProductReview.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error, message);
    res
      .status(500)
      .json({ success: false, message: "Error fetching product reviews" });
  }
};

module.exports = { addProductReview, getProductReviews };
