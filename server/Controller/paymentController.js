import Razorpay from "razorpay";
import PaymentModel from "../Model/paymentModel.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const createPayment = await PaymentModel.create({
      amount: req.body.amount * 100,
      currency: "INR",
      userId: req.id,
    });
    const instance = new Razorpay({
      key_id: process.env.Razor_Key_Id, //Razor_Key_Id
      key_secret: process.env.Razor_Key_Secret,
    });

    const options = {
      amount: createPayment.amount,
      currency: "INR",
      receipt: createPayment._id,
    };

    const order = await instance.orders.create(options);
    createPayment.orderId = order.id;
    await createPayment.save();

    return res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getKey = async (req, res) => {
  try {
    res.status(200).json({ key_id: process.env.Razor_Key_Id }); //Razor_Key_Id
  } catch (error) {
    console.error("Error getting Razorpay key:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const payment = await PaymentModel.findOne({ orderId: razorpay_order_id });

    if (!payment) {
      res.status(400).json({ message: "Payment not found" });
    }

    const instance = new Razorpay({
      key_id: process.env.Razor_Key_Id,
      key_secret: process.env.Razor_Key_Secret,
    });

    const options = {
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
    };

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.Razor_Key_Secret)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      payment.paymentId = razorpay_payment_id;
      payment.signature = razorpay_signature;
      payment.status = "success";
      await payment.save();
      res.status(200).json({ message: "Payment Successful" });
    } else {
      payment.status = "failed";
      await payment.save();
      res.status(200).json({ message: "Payment Failed" });
    }
  } catch (error) {
    console.error("Error getting Razorpay key:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
