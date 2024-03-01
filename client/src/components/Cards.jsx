import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddProductToCart } from "../services/AuthService";

const Cards = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = () => {
    AddProductToCart({ productId: product._id })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const checkOutProduct = () => {
    AddProductToCart({ productId: product._id })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    navigate("/check-out");
  };
  return (
    <div className="card m-2" style={{ width: "16rem" }}>
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          className="card-img-top p-2"
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
        </div>
      </Link>
      <div className="d-grid gap-2 m-3">
        <button className="btn btn-warning" type="submit" onClick={addToCart}>
          Add to Cart
        </button>
        <button
          className="btn btn-success"
          type="button"
          onClick={checkOutProduct}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cards;
