import Express from "express";
import {
  addProductToCart,
  getAllProductsInCart,
  deleteProductInCart,
  decrementProductInCart,
  incrementProductInCart,
} from "../Controller/cartController.js";
import { userToken } from "../Middleware/userToken.js";

const cartRouter = Express.Router();

cartRouter.post("/add", userToken, addProductToCart);
cartRouter.get("/all", userToken, getAllProductsInCart);
cartRouter.delete("/remove/:id", userToken, deleteProductInCart);
cartRouter.put("/decrement", userToken, decrementProductInCart);
cartRouter.put("/increment", userToken, incrementProductInCart);

export default cartRouter;
