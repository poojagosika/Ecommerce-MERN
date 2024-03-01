import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Header from "./components/Header.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard.jsx";
import AddProduct from "./pages/seller/AddProduct.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/user/Cart.jsx";
import { StoreData } from "./Context/StoreContext.jsx";
import Profile from "./pages/Profile.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import SeeAllProducts from "./pages/seller/SeeAllProducts.jsx";
import UpdateProduct from "./pages/seller/UpdateProduct.jsx";
import CheckOut from "./pages/user/CheckOut.jsx";

function App() {
  return (
    <>
      <StoreData>
        <ToastContainer position="bottom-right" />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/check-out" element={<CheckOut />} />
            <Route path="/add-new-product" element={<AddProduct />} />
            <Route path="/see-all-products" element={<SeeAllProducts />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      </StoreData>
    </>
  );
}

export default App;
