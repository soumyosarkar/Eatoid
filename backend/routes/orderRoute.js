import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyPayment ,userOrders, listOrders } from "../controller/orderController.js";

const orderRouter = express.Router();

// Route to place an order
orderRouter.post("/place", authMiddleware, placeOrder);

// Route to verify Razorpay payment
orderRouter.post("/verify-payment", authMiddleware, verifyPayment);
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get('/list',listOrders)

export default orderRouter; 