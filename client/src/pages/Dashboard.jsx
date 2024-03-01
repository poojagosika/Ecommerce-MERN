import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <button type="submit" className="btn btn-dark m-3">
        <Link to={"/dashboard/add"}>Add New Product</Link>
      </button>
      <button type="submit" className="btn btn-dark m-3">
        See all Products
      </button>
      <button type="submit" className="btn btn-dark m-3">
        Orders
      </button>
      <button type="submit" className="btn btn-dark m-3">
        Delivered
      </button>
    </div>
  );
};

export default Dashboard;
