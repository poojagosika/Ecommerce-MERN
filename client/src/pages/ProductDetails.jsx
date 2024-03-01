import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/AuthService.jsx";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  getProductById(id)
    .then((res) => {
      setProduct(res.data.product);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <div className="card m-5 p-4" style={{ maxWidth: 1000 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={product.image}
            className="img-fluid rounded-start"
            alt={product.name}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <h2 className="card-text mt-3">{product.price}</h2>
            <p className="card-text">{product.description}</p>
            <h4 className="card-text">Rating: {product.rating}</h4>
          </div>
          <Link to={"/cart"}>
            <button className="btn btn-warning m-4" type="button">
              Add to Cart
            </button>
          </Link>
          <Link to={"/check-out"}>
            <button className="btn btn-success" type="button">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
