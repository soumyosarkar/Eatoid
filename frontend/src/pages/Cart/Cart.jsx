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
          if(cartItems[cartItems.id]>0){
            return(
              <div key={index} className='cart-items-item cart-items-title'>
                <img className='cart-item-img' src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item.id]}</p>
                <p>{item.price * cartItems[item.id]}</p>
                <img onClick={()=>removeFromCart(item.id)} src='https://img.icons8.com/ios-filled/50/000000/delete-sign.png' alt="" />
              </div>
            )
          }
        })}
      </div>
      
    </div>
  )
}

export default Cart
