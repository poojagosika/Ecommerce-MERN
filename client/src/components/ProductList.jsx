import React from "react";
import { toast } from "react-toastify";
import { removeSellerProductId } from "../services/AuthService";
import { Link } from "react-router-dom";

const ProductList = ({ product, index, setProducts }) => {
  const handleDelete = (id) => {
    removeSellerProductId(id)
      .then((res) => {
        setProducts(res.data?.products);
        toast.success("Product Removed Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <img
          src={product.image}
          alt={product.name}
          className="img-thumbnail rounded"
          style={{ width: "90px", height: "90px" }}
        />
      </td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.category}</td>
      <td>{product.countInStock}</td>
      <td>{product.price}</td>
      <td>
        <Link to={`/update-product/${product?._id}`}>
          <button className="btn btn-dark">Edit</button>
        </Link>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(product?._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductList;
