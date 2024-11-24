import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from './../../context/StoreContext';
const Cart = () => {
    
  const {cartItems, food_list, removeFromCart} = useContext(StoreContext)

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Tilte</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item.id]>0){
            return(
              <div>
                <div key={index} className='cart-items-item cart-items-title'>
                <img className='cart-item-img' src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item.id]}</p>
                <p>{item.price * cartItems[item.id]}</p>
                <p className='cross'onClick={()=>removeFromCart(item.id)} >x</p>
                {/* <img  onClick={()=>removeFromCart(item.id)} src='https://img.icons8.com/ios-filled/50/000000/delete-sign.png' alt="" /> */}
              </div>
              <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>

              <p>{0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{0}</p>
            </div>
            
        </div>
        <button>Proceed to check out</button>
      </div>
      <div className="cart-promocode">
        <div>
          If you have a promo code, Enter it here
          <div className="cart-promocode-input">
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart
