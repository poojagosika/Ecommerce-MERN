import React, { useEffect } from "react";
import { ContextStore } from "../../Context/StoreContext";
import {
  GetAllProductsinCart,
  createOrder,
  getKey,
  verifyPayment,
} from "../../services/AuthService";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { cart, setCart, allUserData } = ContextStore();

  useEffect(() => {
    GetAllProductsinCart()
      .then((res) => {
        setCart(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setCart]);

  const totalAmount = cart?.reduce(
    (total, current) => total + current.product.price * current.quantity,
    0
  );

  const handlePayNow = async () => {
    const {
      data: { id, amount },
    } = await createOrder({ amount: totalAmount });
    const {
      data: { key_id },
    } = await getKey();

    const options = {
      key: key_id,
      amount: amount,
      currency: "INR",
      name: "Ecommerce Website",
      description: "Test Transaction",
      image:
        "https://static.vecteezy.com/system/resources/previews/016/017/018/non_2x/ecommerce-icon-free-png.png",
      order_id: id,
      handler: function (response) {
        verifyPayment(response)
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      },
      prefill: {
        name: allUserData.firstName,
        email: allUserData.email,
        contact: allUserData.phone,
      },
      notes: {
        address: "Ecommerce PVT LTD",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const result = new window.Razorpay(options);

    result.open();
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header">Order Summary</div>
        {cart.map((item, index) => {
          const { product, quantity } = item;
          return (
            <div className="p-3" key={index}>
              <div className="d-flex flex-row">
                <img
                  src={product.image}
                  className="img-fluid rounded-start"
                  alt={product.name}
                  style={{ width: "100px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Quantity : {quantity}</p>
                  <h4 className="card-text">₹{quantity * product.price}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <h4>Total Price : ₹{totalAmount}</h4>
      <button type="button" className="btn btn-warning" onClick={handlePayNow}>
        Pay Now
      </button>
    </div>
  );
};

export default CheckOut;
