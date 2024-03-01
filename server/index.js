import "dotenv/config";
import Express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/userRouter.js";
import sellerRouter from "./Routes/sellerRouter.js";
import cors from "cors";
import productRouter from "./Routes/productRouter.js";
import cartRouter from "./Routes/cartRouter.js";
import paymentRouter from "./Routes/paymentRouter.js";

const app = Express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MONGODB Server");
  })
  .catch((err) => {
    console.log(err);
  });

const corsOptions = {
  origin: "https://ecommerce-mern-omega.vercel.app", // Replace this with the requesting origin or a function to dynamically set it
  credentials: true, // To allow cookies and HTTP authentication
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.status(200).json("Hi this is E-commerce Pojects");
});

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use("/api/users", userRouter);
app.use("/api/sellers", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT 8000");
});
