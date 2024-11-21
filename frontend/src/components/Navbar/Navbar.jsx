import React, { useState } from 'react'
import './Navbar.css'
import { assets } from './../../assets/frontend_assets/assets';
import {Link} from 'react-router-dom'
const Navbar = ({setShowLogin}) => {
  const[menu,setMenu]=useState("Home")

  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo'/>
      <ul className='navber-menu'>
        <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("Mobile-app")} className={menu==="Mobile-app"?"active":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} />
        <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>Login</button>
      </div>
    </div>
  )
}

export default Navbar
