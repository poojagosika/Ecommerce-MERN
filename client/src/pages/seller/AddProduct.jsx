import React, { useEffect, useState } from "react";
import { AddProductDetails } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextStore } from "../../Context/StoreContext";
import ProductForm from "../../components/ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();
  const { allUserData } = ContextStore();

  useEffect(() => {
    if (allUserData?.role !== "seller") {
      navigate("/login");
    }
  }, [allUserData?.role, navigate]);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    countInStock: "",
    rating: "",
    numReviews: "",
    seller: allUserData?._id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    AddProductDetails(product)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/see-all-products");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <ProductForm
      product={product}
      setProduct={setProduct}
      handleSubmit={handleSubmit}
      heading="Add Product"
      buttonName="Add"
    />
  );
};

export default AddProduct;
