import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { AllProducts } from "../services/AuthService";
import Carousel from "../components/Carousel";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    AllProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => console.log(error));
  });
  return (
    <div className="container mt-5">
      <Carousel />
      <h2 className="mt-5">Products</h2>
      <div className=" d-flex flex-wrap">
        {products.map((products) => {
          return <Cards key={products._id} product={products} />;
        })}
      </div>
    </div>
  );
};

export default Home;
