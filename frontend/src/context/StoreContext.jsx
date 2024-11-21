import { createContext, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{

    const [cartItems,setCartItem] =useState({})
    const addToCart = (itemId) => {
        if (!cartItems[itemId]){
            setCartItem((prev)=>({...prev,[itemId] :1}))
        }
        else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const contextValue = {
        food_list,cartItems,removeFromCart,addToCart
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider; 