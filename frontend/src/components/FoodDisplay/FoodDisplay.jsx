import React, { useContext } from 'react'
import './FoodDisplay.css'
// import { food_list } from './../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../Fooditem/FoodItem';
const FoodDisplay = ({category}) => {

    const {food_list}=useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
          if(category==="All" || category===item.category)
          {return <FoodItem key={index} 
          id={item.id} 
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.image}/>}
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
