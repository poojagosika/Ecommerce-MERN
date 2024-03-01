import React from "react";
import {
  DeleteProductsinCart,
  DecrementProductInCart,
  IncrementProductInCart,
} from "../services/AuthService";
import { toast } from "react-toastify";

const CartProducts = ({ item, index, setCart }) => {
  const { product, quantity } = item;

  const handleDelete = (id) => {
    DeleteProductsinCart(id)
      .then((res) => {
        setCart(res.data?.products);
        toast.success("Product Removed Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDecrement = (id) => {
    DecrementProductInCart(id)
      .then((res) => {
        setCart(res.data?.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIncrement = (id) => {
    IncrementProductInCart(id)
      .then((res) => {
        setCart(res.data?.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <h5 className="card-title" style={{ fontSize: "16px" }}>
            {product.name}
          </h5>
        </td>
        <td>
          <img
            src={product.image}
            alt={product.name}
            className="img-thumbnail rounded"
            style={{ width: "90px", height: "90px" }}
          />
        </td>
        <td>{product.description}</td>
        <td>
          <button
            className="btn btn-light d-flex flex-wrap"
            onClick={() => handleDecrement(product._id)}
          >
            -
          </button>
          <button className="btn btn-success d-flex flex-wrap">
            {quantity}
          </button>
          <button
            className="btn btn-light"
            onClick={() => handleIncrement(product._id)}
          >
            +
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger  d-flex flex-wrap"
            onClick={() => handleDelete(product._id)}
          >
            Remove
          </button>
        </td>
        <th>₹{quantity * product.price}</th>
      </tr>
    </>
  );
};

export default CartProducts;
