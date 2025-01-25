import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { log } from "console";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Place user order for frontend
const placeOrder = async (req, res) => {
  try {
    // Step 1: Create a Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: req.body.amount * 100, // Amount in paise (e.g., 100 INR = 10000 paise)
      currency: "INR", // Currency (e.g., INR for Indian Rupees)
      receipt: `order_rcptid_${Date.now()}`, // Unique receipt ID
    });

    // Log the Razorpay order response
    console.log("Razorpay Order:", razorpayOrder);

    // Step 2: Save the order to the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      razorpayOrderId: razorpayOrder.id, // Use the Razorpay order ID
    });
    await newOrder.save();

    // Step 3: Clear the user's cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Step 4: Return Razorpay order details to the frontend
    res.json({
      success: true,
      order_id: razorpayOrder.id, // Razorpay order ID
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// Verify Razorpay payment
const verifyPayment = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    
  } = req.body;

  // Create the HMAC signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      // Find the order by razorpayOrderId and update the payment status
      await orderModel.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id }, // Find by Razorpay order ID
        { payment: true } // Update payment status
      );

      res.json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
      console.error("Error updating order payment status:", error);
      res
        .status(500)
        .json({ success: false, message: "Error updating payment status" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
};

//user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders =await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
};
//Listing Orders From Admin Panel
const listOrders = async(req,res)=>{
  try {
    const orders= await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

//api for updating order status
const updateStatus =  async (req,res)=>{
    try {
      await orderModel.findByIdAndUpdate(
        // { razorpayOrderId: razorpay_order_id }
        req.body.orderId,
        { status: req.body.status }
      );
      res.json({success:true,message:"Status Updated"})
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
}

export { placeOrder, verifyPayment, userOrders, listOrders,updateStatus };
