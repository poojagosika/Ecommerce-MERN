import express from "express";
import {
  createOrder,
  verifyPayment,
  getKey,
} from "../Controller/paymentController.js";
import { userToken } from "../Middleware/userToken.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", userToken, createOrder);
paymentRouter.post("/verify", userToken, verifyPayment);
paymentRouter.get("/get-key", userToken, getKey)

export default paymentRouter;
