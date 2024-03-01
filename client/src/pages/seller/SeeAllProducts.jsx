import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import { ContextStore } from "../../Context/StoreContext";
import { getAllProductSellerData } from "../../services/AuthService";

const SeeAllProducts = () => {
  const { allUserData } = ContextStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductSellerData(allUserData?._id)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allUserData?._id]);

  return (
    <div className="container mt-3">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Product</th>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">CountInStock</th>
            <th scope="col">Price</th>
            <th scope="col">Edit</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <ProductList
                key={index}
                product={product}
                index={index}
                setProducts={setProducts}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SeeAllProducts;
