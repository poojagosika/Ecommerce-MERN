import { createContext, useContext, useState } from "react";

export const CartData = createContext();

export const ContextStore = () => {
  return useContext(CartData);
};

export const StoreData = (props) => {
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState("user");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [allUserData, setAllUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [checkOut, setCheckOut] = useState([]);

  return (
    <CartData.Provider
      value={{
        cart,
        setCart,
        userData,
        setUserData,
        token,
        setToken,
        allUserData,
        setAllUserData,
        checkOut,
        setCheckOut,
      }}
    >
      {props.children}
    </CartData.Provider>
  );
};
