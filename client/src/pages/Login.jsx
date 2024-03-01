import React, { useState } from "react";
import Input from "../components/Input.jsx";
import { LoginUser } from "../services/AuthService.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ContextStore } from "../Context/StoreContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setAllUserData } = ContextStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginUser(data)
      .then((res) => {
        localStorage.setItem("token", res.data?.token);
        localStorage.setItem("user", JSON.stringify(res.data?.existingProfile));
        setAllUserData(res.data?.existingProfile);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="container-sm m-4">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name={"Email"}
          type={"email"}
          id={"email"}
          value={data?.email}
          setInput={setData}
        />
        <Input
          name={"Password"}
          type={"password"}
          id={"password"}
          value={data?.password}
          setInput={setData}
        />

        <button type="submit" className="btn btn-dark">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
