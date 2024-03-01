import Express from "express";
import {
  addProduct,
  allProducts,
  productDetails,
  getAllProductSellerData,
  removeSellerProductId,
  updateSellerProductId,
} from "../Controller/productController.js";
import { userToken } from "../Middleware/userToken.js";
import { sellerMiddleware } from "../Middleware/sellerMiddlware.js";

const productRouter = Express.Router();

productRouter.post("/add", userToken, sellerMiddleware, addProduct);
productRouter.get("/all", allProducts);

productRouter.get("/:id", productDetails);

productRouter.get(
  "/seller/:id",
  userToken,
  sellerMiddleware,
  getAllProductSellerData
);

productRouter.put(
  "/update",
  userToken,
  sellerMiddleware,
  updateSellerProductId
);

productRouter.delete(
  "/remove/:id",
  userToken,
  sellerMiddleware,
  removeSellerProductId
);

export default productRouter;
