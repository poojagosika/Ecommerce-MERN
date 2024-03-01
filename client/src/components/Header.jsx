import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextStore } from "../Context/StoreContext.jsx";
import { toast } from "react-toastify";

const Header = () => {
  const { setAllUserData, setUserData, allUserData, cart } = ContextStore();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAllUserData(null);
    toast.success("Logout Successfully");
    navigate("/");
  };
  return (
    <nav
      className="sticky-sm-top form-inline navbar navbar navbar-expand-lg align-items-center d-flex mb-2 mb-lg-0 "
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid me-auto mb-2 mb-lg-0">
        <Link className="navbar-brand" to={"/"}>
          Ecommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse d-flex me-auto mb-2 mb-lg-0"
          id="navbarSupportedContent"
        >
          <form className="d-flex me-auto mb-2 mb-lg-0" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-warning" type="submit">
              Search
            </button>
          </form>

          {allUserData?.role === "seller" && (
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dashboard
              </button>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <Link className="nav-link" to={"/add-new-product"}>
                    Add New Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/see-all-products"}>
                    See All Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>
                    Order Status
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>
                    Delivered
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <ul className="form-inline navbar-nav ml-auto d-flex mb-2 mb-lg-0 align-items-center">
            {!allUserData && (
              <li className="nav-item" onClick={() => setUserData("user")}>
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </li>
            )}
            {!allUserData && (
              <li className="nav-item" onClick={() => setUserData("user")}>
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
            )}
            {allUserData && (
              <li className="nav-item">
                <Link className="nav-link" to={"/profile"}>
                  Hi, {allUserData.firstName}
                </Link>
              </li>
            )}
            {allUserData && (
              <li className="nav-item">
                <Link className="nav-link" to={"/profile"}>
                  <img
                    src={allUserData.image}
                    alt={allUserData.firstName}
                    className="rounded-circle border border-dark"
                    style={{ width: "40px" }}
                  ></img>
                </Link>
              </li>
            )}
            {allUserData && (
              <li className="nav-item" onClick={handleLogout}>
                <Link className="nav-link" to={"/"}>
                  LogOut
                </Link>
              </li>
            )}
            {(allUserData?.role === "user" || !allUserData) && (
              <li className="nav-item- position-relative">
                <Link className="nav-link" to={"/cart"}>
                  <span className="bg-dark text-light start-30 position-absolute rounded-5">
                    {cart?.length !== 0 ? cart?.length : <></>}
                  </span>
                  <i className="bi bi-cart2 fs-4" />
                </Link>
              </li>
            )}
            {!allUserData && (
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Become a Seller
                </div>
                <ul className="dropdown-menu">
                  <li
                    className="dropdown-item"
                    onClick={() => setUserData("seller")}
                  >
                    <Link className="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={() => setUserData("seller")}
                  >
                    <Link className="nav-link" to={"/register"}>
                      Register
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
