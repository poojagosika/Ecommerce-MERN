import Product from "../Model/productModel.js";
import Profile from "../Model/profileModel.js";
import jwt from "jsonwebtoken";
import CartModel from "../Model/cartModel.js";
import { Model } from "mongoose";

const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await CartModel.findOne({ userId: req.id });

    if (!user) {
      const newCart = await CartModel.create({
        userId: req.id,
        items: [
          {
            productId,
            quantity: 1,
          },
        ],
      });
      return res.status(201).json({ message: "Product Added to Cart" });
    }

    const existingCart = user;
    const existingCartItems = existingCart.items;
    const index = existingCartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index !== -1) {
      existingCartItems[index].quantity += 1;
      await existingCart.save();
      return res.status(201).json({ message: "Product Added to Cart" });
    }

    existingCart.items.push({ productId, quantity: 1 });
    await existingCart.save();
    return res.status(201).json({ message: "Product Added to Cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const user = await CartModel.findOne({ userId: req.id });
    if (!user) {
      return res.status(200).json({ message: "Cart is Empty" });
    }
    const existingCartItems = user.items;

    const index = existingCartItems.findIndex(
      (item) => item.productId.toString() === req.params.id
    );

    if (index === -1) {
      return res.status(201).json({ message: "Product Not Found" });
    }

    existingCartItems.splice(index, 1);
    await user.save();

    const productPromise = existingCartItems.map(async (item) => {
      const product = await Product.findById({ _id: item.productId });
      return {
        product: product,
        quantity: item.quantity,
      };
    });
    const products = await Promise.all(productPromise);
    return res.status(200).json({ products, message: "Products Found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const decrementProductInCart = async (req, res) => {
  try {
    const user = await CartModel.findOne({ userId: req.id });
    if (!user) {
      return res.status(200).json({ message: "Cart is Empty" });
    }
    const existingCartItems = user.items;

    const index = existingCartItems.findIndex(
      (item) => item.productId.toString() === req.body.id
    );

    if (index === -1) {
      return res.status(201).json({ message: "Product Not Found" });
    }

    if (existingCartItems[index].quantity === 1) {
      existingCartItems.splice(index, 1);
      await user.save();

      const productPromise = existingCartItems.map(async (item) => {
        const product = await Product.findById({ _id: item.productId });
        return {
          product: product,
          quantity: item.quantity,
        };
      });
      const products = await Promise.all(productPromise);
      return res
        .status(200)
        .json({ products, message: "Products Incremented" });
    }

    existingCartItems[index].quantity -= 1;
    await user.save();

    const productPromise = existingCartItems.map(async (item) => {
      const product = await Product.findById({ _id: item.productId });
      return {
        product: product,
        quantity: item.quantity,
      };
    });
    const products = await Promise.all(productPromise);
    return res.status(200).json({ products, message: "Products Found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const incrementProductInCart = async (req, res) => {
  try {
    const user = await CartModel.findOne({ userId: req.id });
    if (!user) {
      return res.status(200).json({ message: "Cart is Empty" });
    }
    const existingCartItems = user.items;

    const index = existingCartItems.findIndex(
      (item) => item.productId.toString() === req.body.id
    );

    if (index === -1) {
      return res.status(201).json({ message: "Product Not Found" });
    }

    existingCartItems[index].quantity += 1;
    await user.save();

    const productPromise = existingCartItems.map(async (item) => {
      const product = await Product.findById({ _id: item.productId });
      return {
        product: product,
        quantity: item.quantity,
      };
    });
    const products = await Promise.all(productPromise);
    return res.status(200).json({ products, message: "Products Found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProductsInCart = async (req, res) => {
  try {
    const user = await CartModel.findOne({ userId: req.id });
    if (!user) {
      return res.status(200).json({ message: "Cart is Empty" });
    }

    const existingCartItems = user.items;

    const productPromise = existingCartItems.map(async (item) => {
      const product = await Product.findById({ _id: item.productId });
      return {
        product: product,
        quantity: item.quantity,
      };
    });
    const products = await Promise.all(productPromise);
    return res.status(200).json({ products, message: "Products Found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  addProductToCart,
  deleteProductInCart,
  getAllProductsInCart,
  decrementProductInCart,
  incrementProductInCart,
};
