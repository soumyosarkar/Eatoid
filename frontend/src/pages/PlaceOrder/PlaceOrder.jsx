import  { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  
  const { getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",

  })
  const onChangeHandler=(e)=>{
    const name = e.target.name
    const value =e.target.value
    setData(data=>({
      ...data,[name]:value
    }))
  }
  useEffect(()=>{
    console.log(data);
    
  },[data])

  const placeholder = async (event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quality"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    let response= await axios.post(url+"api/order/place",orderData,{headers:{
      token
    }})
    if(response.data.success){
      const{session_url} = response.data
      window.location.replace(session_url)
    }
    else{
      alert("Error")
    }
  
  }
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
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>

              <p>${getTotalCartAmount() === 0 ? 0 : 3}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 3}
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
