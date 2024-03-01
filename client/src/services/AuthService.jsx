import axios from "axios";

const API = "https://ecommerce-mern-5rs0.onrender.com";

export const RegisterUser = async (data) => {
  return await axios.post(`${API}/api/users/register`, data);
};

export const LoginUser = async (data) => {
  return await axios.post(`${API}/api/users/login`, data);
};

export const UpdateProfileData = async (data) => {
  return await axios.put(`${API}/api/users/update`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const UpdateSellerProductId = async (data) => {
  return await axios.put(`${API}/api/product/update`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const AddProductToCart = async (data) => {
  return await axios.post(`${API}/api/cart/add`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const GetAllProductsinCart = async () => {
  return await axios.get(`${API}/api/cart/all`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const DeleteProductsinCart = async (id) => {
  return await axios.delete(`${API}/api/cart/remove/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const DecrementProductInCart = async (id) => {
  return await axios.put(
    `${API}/api/cart/decrement`,
    { id },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};

export const IncrementProductInCart = async (id) => {
  return await axios.put(
    `${API}/api/cart/increment`,
    { id },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
};

export const removeSellerProductId = async (id) => {
  return await axios.delete(`${API}/api/product/remove/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const AddProductDetails = async (data) => {
  return await axios.post(`${API}/api/product/add`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getAllProductSellerData = async (id) => {
  return await axios.get(`${API}/api/product/seller/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const AllProducts = async () => {
  return await axios.get(`${API}/api/product/all`);
};

export const getProductById = async (id) => {
  return await axios.get(`${API}/api/product/${id}`);
};

export const createOrder = async (data) => {
  return await axios.post(`${API}/api/payment/create`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getKey = async () => {
  return await axios.get(`${API}/api/payment/get-key`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const verifyPayment = async (data) => {
  return await axios.post(`${API}/api/payment/verify`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
