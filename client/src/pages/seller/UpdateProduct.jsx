import React, { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpdateSellerProductId,
  getProductById,
} from "../../services/AuthService";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    console.log(product);
    e.preventDefault();
    UpdateSellerProductId(product)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/see-all-products");
      })
      .catch((err) => console.log(err));
  };

  return (
    <ProductForm
      product={product}
      setProduct={setProduct}
      handleSubmit={handleSubmit}
      heading="Update Product"
      buttonName="Update"
    />
  );
};

export default UpdateProduct;
