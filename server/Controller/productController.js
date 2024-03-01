import productModel from "../Model/productModel.js";

const addProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    return res
      .status(200)
      .json({ product, message: "Product Created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    return res
      .status(200)
      .json({ products, message: "Products Displayed Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProductSellerData = async (req, res) => {
  try {
    const products = await productModel.find({ seller: req.params.id });
    return res
      .status(200)
      .json({ products, message: "Products Displayed Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateSellerProductId = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    return res
      .status(200)
      .json({ product, message: "Products Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const productDetails = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    return res
      .status(200)
      .json({ product, message: "Products Displayed Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeSellerProductId = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    const products = await productModel.find({ seller: req.id });
    return res
      .status(200)
      .json({ products, message: "Products Displayed Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  addProduct,
  allProducts,
  getAllProductSellerData,
  productDetails,
  removeSellerProductId,
  updateSellerProductId,
};
