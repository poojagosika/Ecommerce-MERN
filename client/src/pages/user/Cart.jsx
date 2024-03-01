import React, { useEffect } from "react";
import CartProducts from "../../components/CartProducts.jsx";
import { ContextStore } from "../../Context/StoreContext.jsx";
import { GetAllProductsinCart } from "../../services/AuthService.jsx";
import { Link } from "react-router-dom";

const Cart = () => {
  const { allUserData, cart, setCart } = ContextStore();

  useEffect(() => {
    GetAllProductsinCart()
      .then((res) => {
        setCart(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allUserData?._id, setCart]);

  return (
    <>
      <div className="container mt-3">
        {allUserData ? (
          cart?.length > 0 ? (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                    <th scope="col">Remove</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    return (
                      <CartProducts
                        key={index}
                        item={item}
                        index={index}
                        setCart={setCart}
                      />
                    );
                  })}
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Total Amount:</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">
                      ₹
                      {cart.reduce(
                        (total, current) =>
                          total + current.product.price * current.quantity,
                        0
                      )}
                    </th>
                  </tr>
                </tbody>
              </table>

              <Link to={"/check-out"}>
                <button type="button" className="btn btn-warning">
                  Check Out
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="card text-center mt-5">
                <div className="card-body">
                  <img
                    className="m-3"
                    src="https://img.graphicsurf.com/2019/12/online-shopping-vector-illustration1.jpg"
                    alt=""
                    style={{ width: "300px" }}
                  />
                  <h5 className="card-title">No Products In Cart</h5>
                  <p className="card-text">Add Items in cart to Shop</p>
                  <Link to={"/"}>
                    <button type="button" className="btn btn-dark">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )
        ) : (
          <div className="card text-center mt-5">
            <div className="card-body">
              <img
                className="m-3"
                src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                alt=""
                style={{ width: "300px" }}
              />
              <h5 className="card-title">Missing Cart items?</h5>
              <p className="card-text">
                Login to see the items you added previously
              </p>
              <Link to={"/login"}>
                <button type="button" className="btn btn-dark">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
