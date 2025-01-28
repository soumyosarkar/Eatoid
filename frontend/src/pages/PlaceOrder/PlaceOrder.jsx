import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import {useNavigate} from "react-router-dom"
// import "dotenv/config.js";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const placeholder = async (event) => {
    const frontend_url = "https://eatoid-frontend.onrender.com";
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      items: orderItems,
      amount: getTotalCartAmount() + 3,
      address: data,
    };

    console.log("Order Data:", orderData);

    try {
      const response = await axios.post(url + "api/order/place", orderData, {
        headers: {
          token,
        },
      });

      console.log("Razorpay Order Response:", response.data);

      if (response.data.success) {
        const { order_id, amount, currency } = response.data;

        const options = {
          key: "rzp_test_smU524PweB5YuJ",
          amount: amount.toString(),
          currency: currency,
          order_id: order_id,
          name: "Eatoid",
          description: "Payment for your order",
          handler: async function (response) {
            console.log("Razorpay Payment Response:", response);

            const verificationResponse = await axios.post(
              url + "api/order/verify-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );

            console.log(
              "Payment Verification Response:",
              verificationResponse.data
            );

            if (verificationResponse.data.success) {
              alert("Payment Successful!");
              // window.location.href = `${frontend_url}/verify-payment?success=true&orderId=${response.razorpay_order_id}`;
            } else {
              alert("Payment Verification Failed!");
            }
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: "#316304",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Error creating Razorpay order:", response.data.message);
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      alert("An error occurred during the payment process.");
    }
  };
  const navigate = useNavigate()
  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate("/cart");

    }
  },[token])

  return (
    <form className="place-order" onSubmit={placeholder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First Name"
          />
          <input
            required
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last Name"
          />
        </div>

        <input
          required
          name="email"
          type="text"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          type="text"
          onChange={onChangeHandler}
          placeholder="Street"
          value={data.street}
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            type="text"
            placeholder="City"
            value={data.city}
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
            value={data.state}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            type="text"
            placeholder="pin code"
            value={data.zipcode}
          />
          <input
            required
            name="country"
            type="text"
            onChange={onChangeHandler}
            placeholder="Country"
            value={data.country}
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          type="text"
          placeholder="Phone"
          value={data.phone}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>

              <p>₹{getTotalCartAmount() === 0 ? 0 : 3}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 3}
              </p>
            </div>
          </div>
          <button>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;