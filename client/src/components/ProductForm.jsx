import React from "react";
import Input from "./Input";

const ProductForm = ({
  product,
  setProduct,
  handleSubmit,
  heading,
  buttonName,
}) => {
  return (
    <div className="container m-4">
      <h2>{heading}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="Name"
          type="text"
          id="name"
          value={product.name}
          setInput={setProduct}
        />
        <Input
          name="Price"
          type="text"
          id="price"
          value={product.price}
          setInput={setProduct}
        />
        <Input
          name="Description"
          type="text"
          id="description"
          value={product.description}
          setInput={setProduct}
        />
        <Input
          name="Image"
          type="text"
          id="image"
          value={product.image}
          setInput={setProduct}
        />
        <Input
          name="Category"
          type="text"
          id="category"
          value={product.category}
          setInput={setProduct}
        />
        <Input
          name="Count In Stock"
          type="text"
          id="countInStock"
          value={product.countInStock}
          setInput={setProduct}
        />

        <button type="submit" className="btn btn-dark">
          {buttonName}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
